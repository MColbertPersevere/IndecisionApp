class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            options: []
        }
        this.validate = this.validate.bind(this)
        this.removeAll = this.removeAll.bind(this)
        this.randomPick = this.randomPick.bind(this)
        this.removeOption = this.removeOption.bind(this)
    }
    validate(option){
        if(!option){
            return 'Please Input a valid Option'
        }else if(this.state.options.indexOf(option) > -1){
            return 'Entry already in options'
        }

        this.setState((prevState)=>({
            options:prevState.options.concat([option])

        }))
        //console.log(this.state.options)
    }
    removeAll(){
        console.log(this.state.options)
        this.setState(()=>({
            options:[]
        }))
    }
    removeOption(option){
        this.setState((prevState) => ({
            options:prevState.options.filter((item)=>(
                item !== option
            ))
        }))
    }
    randomPick(){
        const i = Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[i])
    }
    componentDidMount(){

        try{
            console.log('Fetching Data')
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){
            // Do Nothing at All
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            console.log('Saving Data')
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
        }
    }
    render(){
        return (
            <div className="p-3">
                <Header />
                <Options 
                options={this.state.options}
                hasOptions={this.state.options.length > 0}
                removeOption = {this.removeOption}
                />
                <Actions hasOptions={this.state.options.length > 0}
                removeAll={this.removeAll}
                randomPick={this.randomPick}/>
                <Form validate={this.validate}/>
            </div>
        )
    }
}

const Header = (props) => (
    <div>
        <h1>Indecision App</h1>
    </div>
)

const Options = (props) => (
    <div>
        {
            !props.hasOptions && <p>Please Add Options</p>
        }
        {
            props.options.map((item) => (
                <Option 
                    OptionText={item}
                    key={item}
                    removeOption={props.removeOption}
                />
            ))
        }
    </div>
)

const Option = (props) => (
    <div>
        {props.OptionText}
        <button 
            onClick={
                (e) => {
                    props.removeOption(props.OptionText)
                }
            } className="btn btn-outline-secondary">
            Remove
        </button>
    </div>
)

const Actions = (props) => (
    <div>
        <button disabled={!props.hasOptions} onClick={props.randomPick} className="btn btn-outline-secondary mr-1">What Should I Do</button>
        <button onClick={props.removeAll} className="btn btn-outline-secondary">Remove All</button>
    </div>
)

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            error: undefined
        }
        this.validate = this.validate.bind(this)
    }
    validate(e){
        e.preventDefault()
        let option = e.target.elements.option.value
        const error = this.props.validate(option)
        this.setState(()=>({error}))
        e.target.elements.option.value = ''
    }
    render(){
        return (
            <div>
                <form onSubmit={this.validate}>
                <input type="text" name="option" className="input-size mr-1" />
                <button className="btn btn-outline-secondary">Add Option</button>
                {this.state.error && <p>{this.state.error}</p>}
                </form>
            </div>
        )
    }
}

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))