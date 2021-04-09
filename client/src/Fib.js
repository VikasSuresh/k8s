import React,{ Component } from "react";
import axios from "axios";

class Fib extends Component{
    state = {
        seenIndex : [],
        values: {},
        index: ''
    }

    componentDidMount(){
        this.fetchValues()
        this.fetchIndexes()
    }

    async fetchValues(){
        const values = await axios.get('/api/curr')
        this.setState({values: values.data})
    }

    async fetchIndexes(){
        const seenIndexes = await axios.get('/api/all')
        this.setState({seenIndex: seenIndexes.data})
    }

    handleSubmit = async(e)=>{
        e.preventDefault()
        await axios.post('/api/',{
            index:this.state.index 
        })
        this.setState({index:''})
    }
    
    renderSeenIndex(){
        return this.state.seenIndex.map((data)=>data.number).join(', ')
    }

    renderValues(){
        const entries =[];

        for(let i in this.state.values){
            entries.push(
                <div key={i}>
                    For Index {i} value is {this.state.values[i]}
                </div>
            )
        }
        return entries
    }

    render(){
        return(
            <div>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <label>
                        Enter youre index :
                    </label>
                    <input
                        value={this.state.index}
                        onChange={event => this.setState({index:event.target.value})}
                    />
                    <button>
                        Submit
                    </button>
                </form>
                <h3>Indexex which have been seen:</h3>
                {this.renderSeenIndex()}
                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}

export default Fib;