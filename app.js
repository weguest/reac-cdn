var BrowserRouter = window.ReactRouterDOM.BrowserRouter;
var Router = window.ReactRouterDOM.Router;
var Route = window.ReactRouterDOM.Route;
var Link = window.ReactRouterDOM.Link;
var Switch = window.ReactRouterDOM.Switch;


function Header() {
    return (
        <div>
            <nav className="navbar navbar-default radius0 margin0">
            <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    <img src="logo.png" width="100" style={{ "marginTop" : "-22px" }} />
                </a>
            </div>
            </div>
            </nav>
            <nav className="navbar navbar-inverse radius0">
            <div className="container-fluid">
                <div className=" col-md-offset-4 col-md-3">
                    <p>Ra</p>
                </div>
            </div>
            </nav>
        </div>
    );
}
function Footer() {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-bottom">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">

            </a>
          </div>
        </div>
        </nav>
    );
}
function NotFound() {
    return (
        <h1>404 nao encontrado.</h1>
    );
}

var Panel = React.createClass({
    getInitialState: function() {
        console.log(this.props);
        return { message: 'Hello, Universe', items: [] };
    },
    itemClickHandler: function(sender){ 
        var self = this;
        axios.get('api.php?id=' + sender)
        .then(function (response) {
            console.log(response.data);
            self.setState({ items : response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    componentWillMount: function(nextProps, nextState){
        console.log("componentWillMount");
        console.log(this);
        var id = this.props.match.params.id !== undefined ? this.props.match.params.id : 1;
        this.setState({ id : id });

        var self = this;
        axios.get('api.php?id=' + id)
        .then(function (response) {
            console.log(response.data);
            self.setState({ items : response.data });
        })
        .catch(function (error) {
            console.log(error);
        });

    },  
    componentWillUpdate: function(nextProps, nextState){
        console.log("componentWillUpdate");
    },    
    render: function() {
      console.log("render");
      console.log(this);
      return (
        <div className="panel panel-default">
            <div className="panel-heading"> Itens monitorados no painel <strong>{this.state.id}</strong> </div>
            <div className="panel-body">
                { this.state.items.map(function(item) { return <ItemBase itemClickHandler={this.itemClickHandler} item={item} key={item.id}  /> }, this) }
            </div>
        </div>
      )
    },
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }
});
var ItemBase = React.createClass({
    getInitialState: function() {
        console.log(this.props);
        return { message: 'Hello, Universe' };
    },
    itemClick:function(){
        this.props.itemClickHandler(this.props.item.id);
    },
    render: function() {

      var classe = "";
      switch (this.props.item.estadp) {
          case 'Normal':
            classe = "alert-success";
              break;
      
          default:
            classe = "alert-danger";
              break;
      }

      var classes = "panel-body " + classe ;
      return (
        <div className="col-md-2">
            <div className="panel panel-default">
                <div className={classes} onClick={ this.itemClick }>
                    <div><strong>{this.props.item.nome}</strong></div>
                    <div>{this.props.item.estado}</div>
                </div>
            </div>
        </div>
      )
    }
});
var ItemGrafico = React.createClass({
    getInitialState: function() {
        console.log(this.props);
        return { message: 'Hello, Universe' };
    },
    render: function() {
      return (
        <div className="panel panel-default">
            <div className="panel-body">
                <span onClick={this.clickHandler}>Mensagem:</span> {this.state.message}
            </div>
        </div>
      )
    }
});
var ItemLista = React.createClass({
    getInitialState: function() {
        console.log(this.props);
        return { message: 'Hello, Universe' };
    },
    render: function() {
      return (
        <div className="panel panel-default">
            <div className="panel-body">
                <span onClick={this.clickHandler}>Mensagem:</span> {this.state.message}
            </div>
        </div>
      )
    }
});

ReactDOM.render(
    <div>
        <Header />
        <BrowserRouter basename="/react-cdn">
            <Switch>
                <div className="container">
                <Route exact path='/:id?' component={Panel}/>
                <Route path='/about' component={Panel}/>
                <Route path='/contact' component={Panel}/>
                </div>
            </Switch>
        </BrowserRouter>
        <Footer />
    </div>, document.getElementById('react-app'));


