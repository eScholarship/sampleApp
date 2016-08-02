// Page content for item view
//
// Note: automatically has access to all Components defined in global.jsx, such as
// <Header>, <Footer>, etc.
//
class ItemPage extends React.Component
{
  render() { 
    let p = this.props
    let debugStyle = { backgroundColor: '#dcdcdc' };
    return(
      <div className="container-fluid">
        <Header/>
        <div style={debugStyle}>
          <h2>Item: {p.id}</h2>
          Info:
          <ul>
            <li>Title: {p.title}</li>
          </ul>
        </div>
        <p>Breadcrumb and other journal specific header content here</p>
        <div className="row">
          <div className="col-sm-8">
            <ItemTabbed/>
          </div>
          <div className="col-sm-4">
            <div class="card card-block">
              <h4 class="card-title">Download</h4>
              <a href="#" class="card-link">Link</a>
            </div> 
            <div class="card card-block">
              <h4 class="card-title">Buy</h4>
              <a href="#" class="card-link">Link</a>
            </div> 
            <div class="card card-block">
              <h4 class="card-title">Share</h4>
              <a href="#" class="card-link">Link</a>
            </div>
            <div class="card card-block">
              <h4 class="card-title">Jump to:</h4>
              <a href="#" class="card-link">Link</a>
            </div>
            <div class="card card-block">
              <h4 class="card-title">Related Items</h4>
              <a href="#" class="card-link">Link</a>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

{/* Tabbed Navigation courtesy Trey Piepmeier http://codepen.io/trey/post/tabbed-navigation-react*/}
var tabList = [
  { 'id': 1, 'name': 'Main content', 'url': '/main' },
  { 'id': 2, 'name': 'Data & media', 'url': '/suppl' },
  { 'id': 3, 'name': 'Metrics', 'url': '/metrics' },
  { 'id': 4, 'name': 'Author & article info', 'url': '/authorarticle' },
  { 'id': 5, 'name': 'Comments', 'url': '/comments' }
];

class Tab extends React.Component {
  handleClick(e){
    e.preventDefault();
    this.props.handleClick();
  }
  
  render() { return(
    <li className="nav-item">
      <a className={this.props.isCurrent ? 'current' : null} 
         onClick={this.handleClick.bind(this)}
         href={this.props.url}>{this.props.name}&nbsp;&nbsp;
      </a>
    </li>
  )}
}

class Tabs extends React.Component {
  handleClick(tab){
    this.props.changeTab(tab);
  }
  
  render() { return(
    <ul className="nav nav-tabs">
    {this.props.tabList.map(function(tab) {
      return (
        <Tab
          handleClick={this.handleClick.bind(this, tab)}
          key={tab.id}
          url={tab.url}
          name={tab.name}
          isCurrent={(this.props.currentTab === tab.id)}
         />
      );
    }.bind(this))}
    </ul>
  )}
}


class Content extends React.Component {
  render() { return(
    <div>
      {this.props.currentTab === 1 ? <ContentMain/> : null }
      {this.props.currentTab === 2 ? <ContentSuppl/> : null}
      {this.props.currentTab === 3 ? <ContentMetrics/> : null}
      {this.props.currentTab === 4 ? <ContentAuthArt/> : null}
      {this.props.currentTab === 5 ? <ContentComments/> : null}
    </div>
  )}
}

class ContentMain extends React.Component {
  render() { return(
    <div className="content">
      Item main content here 
    </div>
  )}
}

class ContentSuppl extends React.Component {
  render() { return(
    <div className="content">
      Data &amp; Media content here
    </div>
  )}
}

class ContentMetrics extends React.Component {
  render() { return(
    <div className="content">
      Metrics content here
    </div>
  )}
}

class ContentAuthArt extends React.Component {
  render() { return(
    <div className="content">
      Author &amp; Article content here
    </div>
  )}
}

class ContentComments extends React.Component {
  render() { return(
    <div className="content">
      Comments content here
    </div>
  )}
}

class ItemTabbed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: tabList,
      currentTab: 1
    };
  }

  changeTab(tab) {
    this.setState({ currentTab: tab.id });
  }

  render() { return(
    <div>
      <Tabs
        currentTab={this.state.currentTab}
        tabList={this.state.tabList}
        changeTab={this.changeTab.bind(this)}
      />
      <Content currentTab={this.state.currentTab} />
    </div>
  )}
}

// Render everything under the single top-level div created in the base HTML. As its
// initial properties, pass it the chunk of initialData included in the base HTML.
ReactDOM.render(<ItemPage {...initialData}/>, document.getElementById('uiBase'))
