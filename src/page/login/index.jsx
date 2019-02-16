import React, { Component } from 'react';
import TopBar from '@/components/Topbar';
import {withRouter} from 'react-router-dom';
import style from './style.module.scss';
class Login extends Component {
    render() {
        return (
            <div className={style.contain}>
                <TopBar title='登陆' handleBack={() => { this.props.history.push('/')}}/>
                <div className={style.login}>
                    <div className={style.cell}>
                        <div className={style.logininput}>
                            <img className={style.icon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4Qzc1NjlCODJGNDExRTdBMjE3QjJCRDBFNDhDNzhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4Qzc1NjlDODJGNDExRTdBMjE3QjJCRDBFNDhDNzhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjhDNzU2OTk4MkY0MTFFN0EyMTdCMkJEMEU0OEM3OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjhDNzU2OUE4MkY0MTFFN0EyMTdCMkJEMEU0OEM3OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4MHAW1AAAB20lEQVR42mL8//8/w1ACTAxDDIw6eNTBaICFGEUVFRVsQKoLiPNp5I7FQFzd0dHxmJBCRmJKCaCDzwMpAyB+B8SPqOxYASBWAOL3QKwOdPRrikIY6NhkqGNnAA3LxCJPkWuBZoLMKAQy+4C4BIjLKU0SflC6koA6SSBOAmJWNPF/QLwEiO/h0TsF6mBNaqTh31CaD4g/4FFnBsQtOOQeEXCwKJT+RQ0H/4HSrATUbQRicyDmxeLhowT0MiPFBuWlBAng1Gg5POrgUQePOnjUwaMOHnXwqINHHTzq4FEHD6yDYWru0coRSN17gu4hpU8XA+zdPqO2Y6G9bjE0uyhy8DcovYgOMf6ZGg7mgNLToIMdxIAf0A4lF5HqQT3yXGLUE+Ngdmg6y8YTpZSkX5g5uUiBQ1Gm+wc1UJlIN4DGGA4CMWh4S5fIdCxLbDefGAczo41PEAILgNiOATK8NZ1IPTCHMlLDwbBoIjb9nkZiXyZSz1sozUYNBx+B0jlEWt4AxB5AHATEmUTq8YDSLwkpJDjcCkxfoEwHKn+FoI4nFNI/gfgmEIMMVmLAHLrClqndoGxNYCa8QZGDoY5WBFKzgNiFRuXvRVAMAh17hOIQHm38jDp41MHUBQABBgA1/XFA35qJ7gAAAABJRU5ErkJggg==" alt="" />
                            <div className={style.cellbd2}>
                                <input type="text" pattern="[0-9]*" className={style.tel} placeholder='请输入手机号/系统编号' />
                            </div>
                        </div>
                        <div className={style.logininput}>
                            <img className={style.icon} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1NjU4RjVDNkU4MjExRTc4NjkwRDc4ODc3MDJDMjgxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1NjU4RjVENkU4MjExRTc4NjkwRDc4ODc3MDJDMjgxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDU2NThGNUE2RTgyMTFFNzg2OTBENzg4NzcwMkMyODEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDU2NThGNUI2RTgyMTFFNzg2OTBENzg4NzcwMkMyODEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6XUMp2AAACeElEQVR42uyYS0gVURjHZ8xQI9AiSCnLiB4ohKCt2vVYFC2iRQ8oiiAiCCJTudAiCtJbLSOIEtwVhYsWrXoseqxqE0lR9CAyoyAosKLS7u136C8Ml1Dn3HOGhubAj+86Mmd+8815fDNhsVgM0tQqgpS1TDgTTrtwZbkd5HI5E+pgA6yCtdAE0+AN3IG7cB2GSs/P5/PJCSNbSzgNe0v+9RnMerlI7NLxq9AJLxMfEshuJ3yS7DPFJepzFsxWlpfDfngFm+AFdCUqjKy54EUIYauk+iQT3YkKuplzsBj26fgpHfMvjOxuXfA1NMKVGKefhxb4KPmTXoWRXUjo1wVXMGHeWiTpCbTCF+imz/U+MzyguBrZkTLm6zBs1u9+L8LKbjvcQnbQwZJ6Q8vdXPre5iPDhxS7AnftuOIeH8JbFB86FL4NP8wQI8vVroUb4AHDwWUBPQr3tF63OhPWjmbaIw/lwXvFOS4z/M1V7fGXFip+dybMMBjV42vzIDxf8emU7m6idzqGgnlMx2AjLNDhD9p+Qweypp/6yNp8DU6QoKHYwsiaknEwkoHHeiJNjjNs5H7CMpiuSq8F6Xdxy8sOyfZw8pFJ6mHrFq2H6esM4QAcFrHG8JrxPhN8oTiquNRm0hUU6xIUroqM7djCY2UsZb1w2aK4Ghf+lfRLaLe28tq0vDUPl2wK/7xwYbKxmH1I+d+Ew7QJz/PVf+UUsmQzcS5BM4y4TuBEwjMin53itp1lLoc1Nnf0XLEtwTnVrPjVprxcSbivP/uUaV+TyazbM4M/3+BMW0cVd9OmgN9BuADVCWXY1BAHkT1r9caRbRyZcCacCQe/BRgAjaCifnlvCFwAAAAASUVORK5CYII=' alt="" />
                            <div className={style.cellbd}>
                                <input type="password" pattern="[0-9]*" className={style.tel} placeholder='请输入密码' />
                            </div>
                        </div>
                    </div>
                    <div className={style.Button}>
                        <button type="button">登陆</button>
                    </div>
                    <div className={style.textbetween}>
                        <span style={{color:'#f35'}} onClick={()=>{this.props.history.push('/register')}}>免费注册</span>
                        <span style={{color:'#999'}}>忘记密码？</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);