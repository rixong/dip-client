import React, { Component } from 'react';

class PhotoUploadWidget extends Component {

  // state = {
  //   url: '',
  //   caption: ''
  // }

  checkLoadResults = (resultEvent) => {
    // console.log(resultEvent.event);
    if (resultEvent.event === 'success') {
      // console.log(resultEvent.info.secure_url);
      this.props.handlePhotoUpload(resultEvent.info.secure_url)
      
      // this.setState({
      //   url: resultEvent.info.secure_url,
      //   caption: resultEvent.info.caption
      // })
      // .then(this.props.history.push('/profile'))
    }
  }

  showWidget = (widget) => {
    widget.open();
  }


  render() {

    let widget = window.cloudinary.createUploadWidget({
      cloudName: 'dzycwwun9',
      uploadPreset: 'phftqqcu',
      cropping: true
    }, (error, result) => {
      this.checkLoadResults(result)
      // if (!error && result && result.event === "success") { 
      //   console.log('Done! Here is the image info: ', result.info.url); 
      // }
    })
    return <div>
      <button onClick={() => this.showWidget(widget)}>Upload your photo</button>
    </div>
  }
}
export default PhotoUploadWidget;