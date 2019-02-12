import React,{ Component } from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter} from 'react-router-dom';
import './style.scss';
class Footbar extends Component{
    state={
        tab:[
            {
                text:'超买',
                path:'/home',
                icon: 'icon-5gouwudai2'
            }, {
                text: '购物车',
                path: '/cart',
                icon: 'icon-gouwucheman'
            }, {
                text: '分享推广',
                path: '/user/share',
                icon: 'icon-tubiaozhizuo-'
            }, {
                text: '我的',
                path: '/user/center',
                icon: 'icon-wodemian'
            }
        ],
        selectedTab:''
    }
    componentWillMount(){
        let {match} =this.props;
        
        this.setState({
            selectedTab:match.path
        })
    }
    render(){
        let {tab,selectedTab} = this.state;
        let {history,match} =this.props;
        return (
            <TabBar
            unselectedTintColor="#999"
            tintColor="#f35"
            noRenderContent={true}
            prerenderingSiblingsNumber={0}
            >
            {
                tab.map(item=>{
                    return (
                        <TabBar.Item
                            title={item.text}
                            key={item.path}
                            icon={<i  className={[`iconfont ${item.icon}`]} />}
                            selectedIcon={<i style={{color:'#f35'}} className={[`iconfont ${item.icon}`]} />}
                            selected={selectedTab===item.path}
                            onPress={() => {
                                if(match.path!==item.path){
                                    history.push(item.path);
                                }
                                return null;
                            }}
                        >
                        </TabBar.Item>
                    )
                })
            }
            </TabBar>
        )
    }
}
Footbar = withRouter(Footbar)
export default Footbar;