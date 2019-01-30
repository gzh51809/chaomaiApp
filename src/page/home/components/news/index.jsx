import React from 'react';
import  './style.scss';
import { Carousel} from 'antd-mobile'
function HomeNews(){
    return (
        <div className='news'>
            <div className="title">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAgCAYAAADHcIz7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNBRjZBNThEQTMyNjExRTc5NUE4REVFQjYwRDYzQjg3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNBRjZBNThFQTMyNjExRTc5NUE4REVFQjYwRDYzQjg3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0FGNkE1OEJBMzI2MTFFNzk1QThERUVCNjBENjNCODciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0FGNkE1OENBMzI2MTFFNzk1QThERUVCNjBENjNCODciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4gj6yVAAAFv0lEQVR42uxbTXLTShAeg/b4nQBl91ghTmD5BHHWj6rEJ4h9AWK/C0Q+gewqWFucwPINlBXsnriBOcCr0GNa0Bl6pJ6R7ISQrlKJCGl++uvu+bpn3Lu9vVVP8vjk2ZMKHqf0zAe3f/9zAbdz4/G09/lDQR/8/+/rmbCPEq4c7+r5u5uqnxhu8YHnl8O4864agzFvflHg5w9Dxzb6cEvh6lMdQTtjrzFZIm4AHUVGJwNG4TEOSMsOQb5yHEOiDYS26dGGq1zBuBMY75RRbuTQTjXnuKVh6H43XN/oUO7y6u2dce51/On9MoB/XAsGfE29AK6hxxAmcK3gKo4clSagtAUAU5JnESpY7Pmec6bAhXBbOxqUq1TRYHnsNXZ0T0tO2PL7jx2NITrKbF+9DYMO1ueN4fE6HPwF1wVaj02W6AldWqtW3KWxtFRh37cvPZ/sAOrX7Y7x7iqREUWpFBCKywDD4xaul2hVsQWEL4QMUYWZ7y/IN2nDxKRSIljmZFYQYpfk7wxCXtnQb9XeXNDvC+yj7BjUBPUUEj0qYnylrU+Y36QG1GXFYwJDMfrDa1wPTQXmjNWsGbASB6uTrnNznLRpRFsLaPWh5rvSZur4onV9g1nHhCN7BIcSI8WWAJ7WLGeaNP3QPReKvwoHuWFC3twztDRJp4SrBSv2X7fAMZBApcJPQgR/QpymbzHkMwC1MNOdC4NcDJiPzzHvrAY5YzrJHLzVCVToL6P9dyCurDjbK689K05bNNG3jGsMoP7iTAGGhSalmTnWjPEo1wRbss7tMHzdt2w7aIPLU7XOMjDcHYIfETwigf4WHKi2UOyzbkyFIbj0sFKdh7ow2oLJOduQn0Ma16luH+a3I+FXmhaF+6jzvUBRGPov2gBbIqBZQ2JPrX5pDMyl8iQCF60/F4CVC+e4qDzqADxh1FFuH3EeuzJCzcASmu+Ezefvbk4wfMQNbLaWvjuscf2u3ASJ0FAdUZAnZB5A5ohRH3N0UbElQEsqjRxrbYKLhMlklhspu4T352Yb0lCvgeiYPN2LwDzOkKxeNQBUhX+zFJrA9yN0vqiOG/Vwx4K+MFRMgR466BlApRZCUCcn1UCFKUdJ3o8ZJutsLMx8Dym5bfcHWXJYw0NCJjvYCdvZBQ4KiY2cLvSYaEgGfiXxdui3ju7rNGwgTJmmD8x7SxupgznNGP4xZHnBp/dsOy7kaUNi/tDCjlcG45s0LPhtPSdU7Qv8RxGs6EUO8zLlmrDnn3J3266SVdDh2L8YZccc65oPTXwqSLZlo2xIpYoODdmlUrYN1B8mriGZkESO4LzpKBXqXFyAnTck+/q0gkteOnVIYbgwlivZDo1SnvVrrAStLaExwzHlvzWwnqlKUy4pUW5qCUMrC0lq7UHopZOGAorOCC7g3aXwvJLEkLUB2Uq8U4dlpHywoRhZeB3hSC3fJb4MmAB66RBNNLiqCdzKkC2HBXW+WlXwlvDOf5Z0JyfjXBsRaQUMOavzWOmEfEjITqDYkZJtTNhkgoqeCsEMsa9TQVVoZ9GRCFySLcSMN5phflJjJFV9mY53BAz5rAKXA/ZSAlrbvJB4h5aX6JldnQnS4N6YhwiIxwzUz2K71JC1t5ypqvjuD24sWJYke+IrxhDP0ShYYGOucxh0Fz8ZoJWYSLltAuz3Hs01tOaoSAr/VzBKc40G+yOdxEh0eXPoAy5z1Ff5ki+sPZdGyNZe29dbeb/DLwH2BRFdZ+WIETxLlH1bbUPOQ7tKiSHyxPR8NJZpzZqbSr1V8Xu9LxyM3ZS9Fz+zKPJQImWsWnEJ5onDptP86CGZhS9sHMFM0JA0oImNZSPY4xpwuTVyINS3dElaWNbwO6G4JFYaMcxNKiHD6Kr9zzHzrALyK/7tm7KMbeRPr6s0lBoG5N2vbhNr2ZyuTvUBAWYpyAUktJA4ha43Qx9sGtV7+rXd45SnX9s9UvkmwAC9+mYBwfCrsQAAAABJRU5ErkJggg==" alt=""/>
            </div>
            <div className='newcar'>
                <Carousel className="my-carousel"
                    vertical
                    dots={false}
                    dragging={false}
                    swiping={false}
                    autoplay
                    infinite
                >
                    <div className="v-item">carousel 1</div>
                    <div className="v-item">carousel 2</div>
                    <div className="v-item">carousel 3</div>
                </Carousel>
            </div>
            
        </div>
    )
}

export default HomeNews;