import { Component } from 'react';
import { Input, Select, Button } from 'antd';
import axios from 'axios';

class App extends Component {
  state = {
    url: 0,
    video: "",
    type: 'videos',
    loader: false
  };

  changingValue = (event) => {
    let value = event.target.value;
    let fullValue = value.split("=").at(-1);
    this.setState({url: fullValue});
  }

  getReaquestFromBackend = () => {
    this.setState({ loader: true })
    axios.get("https://api.vevioz.com/api/widget/videos/" + this.state.url).then((res) => {
      console.log(res.data)
      this.setState({ video: res.data })
    }).catch(err => {
      console.log(err)
    }).finally(() => this.setState({ loader: false }))
  }

  render() {
    return (
      <div>
        <h2 className='text-center'> Youtube video and mp3 downloader </h2>
        <div className='row m-0'>
          <div className='col-6 offset-3 mt-2'>
            <div className='row m-0'>
              <div className='col-9'>
                <Input onChange={(e) => this.changingValue(e)} placeholder='Video url' />
              </div>
              <div className='col-3'>
                <Button
                  block
                  type='primary'
                  loading={this.state.loader}
                  onClick={this.getReaquestFromBackend}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: this.state.video }} />
      </div>
    );
  }
}


export default App;