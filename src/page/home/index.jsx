import React,{Component} from 'react';
import FootBar from '../../components/footbar'

class Home extends Component{
    state={
        selectedTab:'home'
    }
    render(){
        return(
        <div>
            <FootBar/>
        </div>
        ) 
    }
}

export default Home;