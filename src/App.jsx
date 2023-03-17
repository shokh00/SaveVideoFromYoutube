import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast, error } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { Button, Input } from 'antd';


class App extends Component {
  state = {
    url: 0,
    video: "",
    type: 'videos',
    loader: false
  };

  componentDidUpdate() {
    const h2 = document.getElementsByTagName("h2")[0];
    if (h2) {
      document.title = h2.innerHTML
    }

    console.log(h2);
  }

  changingValue = (event) => {
    let value = event.target.value;
    let fullValue = value.split(/[=/]+/).at(-1);
    this.setState({ url: fullValue });
  }

  getReaquestFromBackend = () => {
    this.setState({ loader: true })
    axios.get("https://api.vevioz.com/api/widget/videos/" + this.state.url).then((res) => {
      console.log(res.data)
      this.setState({ video: res.data })
    }).catch(err => {
      toast.error("Error");
      console.log(err);
    }).finally(() => this.setState({ loader: false }))
  }


  render() {
    return (
      <div>
        <h1 className='text-center my-2'> Youtube video and mp3 downloader </h1>
        <div className='row m-0'>
          <div className='mt-2'>
            <div className='row m-0 total'>
              <div className='forinput'>
                <Input onChange={(e) => this.changingValue(e)} placeholder='Video url' />
              </div>
              <div className='forbtn'>
                <Button
                  type='primary'
                  loading={this.state.loader}
                  onClick={this.getReaquestFromBackend}
                >
                  Search
                </Button>
                <ToastContainer position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark" />
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: this.state.video }} />
        </div>
      </div >
    );
  }
}
export default App;