const db = require("../driver");

const initConversation = async ({ userid1, userid2 }) => {
  const first = Math.min(userid1, userid2);
  const second = Math.max(userid1, userid2);
  try {
    const response = await db.query(
      `
        insert into conversation(userid1,userid2,datecreated,lastactivedate)
            values($1,$2,now(),now()) returning *;`,
      [first, second]
    );

    return response.rows[0];
  } catch (e) {
    const response = await db.query(
      `
        select * from conversation where userid1=$1 and userid2=$2
        limit 1;
    `,
      [first, second]
    );
    return response.rows[0];
  }
};
const getExistConversation = async ({ userid1, userid2 }) => {
  try {
    const first = Math.min(userid1, userid2);
    const second = Math.max(userid1, userid2);

    const response = await db.query(
      `
            select * from conversation where userid1=$1 and userid2=$2
            limit 1;
        `,
      [first, second]
    );

    if (response.rowCount > 1) {
      return response.rows[0];
    }
    throw new Error("no conversation");
  } catch (e) {
    throw e;
  }
};
const insertMessage = async ({ userid, receiver, conversationid, content }) => {
  try {
    const res = await db.query(
      `insert into message(userid,conversationid,content,receiver,datecreated)
            values($1,$2,$3,$4,now()) returning *;`,
      [userid, conversationid, content, receiver]
    );
    return res.rows[0];
  } catch (e) {
    throw e;
  }
};
const getAllConversation = async ({ userid }) => {
  try {
    const res = await db.query(
      `select * from conversation where userid1=$1 or userid2=$1 limit 10;`,[userid]
    );
    return res.rows;
  } catch (e) {
    throw e;
  }
};
const getAllMessage = async ({ conversationid }) => {
  try {
    const res = await db.query(
      `select * from message where conversationid=$1 order by messageid desc limit 10;`,
      [conversationid]
    );
    return res.rows.reverse();
  } catch (e) {
    throw e;
  }
};
module.exports = {
  initConversation,
  getExistConversation,
  insertMessage,
  getAllConversation,
  getAllMessage,
};
