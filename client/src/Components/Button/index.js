import React from 'react'
import styles from './Button.module.scss'
import {useColor} from 'src/lib/hooks/useColor'
export default function Button({innerText,onClick,variant='light'}) {
    const color=useColor('button',variant)
    return (
        <button className={styles.button} style={{backgroundColor:color.background,color:color.text}}>
                {innerText}
        </button>
    )
}
