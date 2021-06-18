import React from 'react'
import Avatar from 'src/Components/Avatar'
import { Badge ,withStyles} from '@material-ui/core'


const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 4,
      top: 4,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
export default function IconBadge({icon,size,count}) {
    return (<StyledBadge badgeContent={count??4} color="secondary">
  <Avatar userAvatar={icon} size={size}/>
</StyledBadge>
        
    )
}
