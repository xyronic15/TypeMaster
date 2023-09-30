import React from 'react'
import { Button as ButtonBootstrap } from 'react-bootstrap'
import './Button.css'

export default function Button({ children, ...props }) {
    return (
        <ButtonBootstrap
            href={props.href}
            variant={props.variant}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
            style={props.style}
            className={props.className}
        >
            {children}
        </ButtonBootstrap>
    )
}
