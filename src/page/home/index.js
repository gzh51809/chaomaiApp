import React,{Component} from 'react';
import { NavBar, Icon,Tabs,Badge,TabBar,Carousel, WhiteSpace} from 'antd-mobile';
import './style.css';
// const tabs = [
//       { title: <Badge >首页</Badge> },
//       { title: <Badge >农业</Badge> },
//       { title: <Badge >食品,饮料</Badge> },
//       { title: <Badge >纺织,皮革</Badge> },
//       { title: <Badge >首页</Badge> },
//       { title: <Badge >首页</Badge> },
//       { title: <Badge >首页</Badge> },
//       { title: <Badge >首页</Badge> },
//       { title: <Badge >首页</Badge> },
//     ];
class Home extends Component{
    state = {
        data: ['1'],
        imgHeight: 175,
        selectedTab:'home'
    }
    render(){
        return(
            <div className="Home">
                <TabBar
                unselectedTintColor="#999"
                tintColor="#f35"
                barTintColor="white"
                tabBarPosition='bottom'
                >
                    <TabBar.Item
                        title="超买"
                        key="home"
                        icon={<i  className="iconfont icon-5gouwudai2" />}
                        selectedIcon={<i style={{color:'#f35'}} className="iconfont icon-5gouwudai2" />}
                        selected={this.state.selectedTab==='home'}

                        onPress={() => {
                        this.setState({
                            selectedTab: 'home',
                        });
                        }}
                        data-seed="logId"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        title="购物车"
                        key="cart"
                        icon={<i className="iconfont icon-gouwucheman" />}
                        selectedIcon={<i style={{color:'#f35'}} className="iconfont icon-gouwucheman" />
                        }
                        selected={this.state.selectedTab==='cart'}
                        
                        onPress={() => {
                        this.setState({
                            selectedTab: 'cart',
                        });
                        }}
                        data-seed="logId"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        title="分享推广"
                        key="share"
                        icon={<i className="iconfont icon-tubiaozhizuo-" />}
                        selectedIcon={<i style={{color:'#f35'}} className="iconfont icon-tubiaozhizuo-" />
                        }
                        selected={this.state.selectedTab==='share'}
                        
                        onPress={() => {
                        this.setState({
                            selectedTab: 'share',
                        });
                        }}
                        data-seed="logId"
                    >
                        
                    </TabBar.Item>
                    <TabBar.Item
                        title="我的"
                        key="mine"
                        icon = { < i className = "iconfont icon-wodemian"/>}
                        selectedIcon={<i style={{color:'#f35'}} className="iconfont icon-wodemian" />
                        }
                        selected={this.state.selectedTab==='mine'}
                        
                        onPress={() => {
                        this.setState({
                            selectedTab: 'mine',
                        });
                        }}
                        data-seed="logId"
                    >
               
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

export default Home;