import React, { Component } from 'react';

class PhotoUploadWidget extends Component {

  checkLoadResults = (resultEvent) => {
    console.log('clicked save photo', resultEvent.event);
    if (resultEvent.event === 'success') {
      // console.log(resultEvent.info.secure_url);
      this.props.handlePhotoUpload(resultEvent.info.public_id)

      // this.setState({
      //   url: resultEvent.info.secure_url,
      //   caption: resultEvent.info.caption
      // })
      // .then(this.props.history.push('/profile'))
    }
  }

  showWidget = (widget) => {
    console.log('widget');
    
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
      <button onClick={() => this.showWidget(widget)}>Add your photo</button>
    </div>
  }
}
export default PhotoUploadWidget;