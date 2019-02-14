import React from 'react'
import style from './style.module.scss'
import PropTypes from 'prop-types'

const Topbar = (props) => (
    <div className={style.Header}>
        <div className={style.left} onClick={props.handleBack}>
            <div className={style.leftArrow}>
            </div>
        </div>
        <h1 className={style.headerTitle}>{props.title}</h1>
        <div className={style.right}
            style={{ display: `${props.right ? 'block' : 'none'}` }}
            onClick={props.handleRight}
        >登录</div>
    </div>
)

Topbar.propTypes = {
    handleBack: PropTypes.func,
    title: PropTypes.string,
    right: PropTypes.bool,
    handleRight:PropTypes.func
}


export default Topbar;