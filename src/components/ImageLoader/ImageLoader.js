import React, { Component } from 'react'
import classnames from 'classnames';
import './ImageLoader.css'

export default class ImageLoader extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // loading: true,
      src: '',
      showDefaultImg: false,
      intersected: false,
      lazyloaded: false
    }
    this.observer = null;
    this.imageLoaderRef = React.createRef();
  }
  componentWillReceiveProps({url: newUrl}) {
    if (newUrl !== this.props.url) {
      this.setState({
        showDefaultImg: false,
        loading: true
      });
      this.loadImg(newUrl);
    }
  }
  componentDidMount() {
    this.isIntersectionObserver = 'IntersectionObserver' in window;
    const { url } = this.props;
    if (this.isIntersectionObserver) {
      this.observer = new IntersectionObserver(entries => {
        const image = entries[0];
        if (image.isIntersecting) {
          this.setState({
            intersected: true
          })
          this.loadImg(url);
          this.observer.disconnect();
        }
      });
      this.observer.observe(this.imageLoaderRef.current);
    } else {
      this.loadImg(url);
    }
  }
  componentWillUnmount() {
    if (this.isIntersectionObserver) {
      this.observer.disconnect();
    }
  }
  loadImg = url => {
    var img = new Image();
    img.src = url;
    img.onload = () => {
      this.setState({
        loading: false,
        src: img.src,
        lazyloaded: true
      })
      setTimeout(() => {
        this.setState({
          lazyloaded: false
        });
      },100);
    };
    img.onerror = (e) => {
      this.setState({
        showDefaultImg: true,
        loading: false
      })
    };
  }
  srcImage = () => {
    const { isIntersectionObserver, intersected } = this.state;
    const { url } = this.props;
    if (isIntersectionObserver) {
      return intersected ? url : '';
    } else {
      return url;
    }
    return url;
  }
  imgClick = e => {
    const { handleImgClick } = this.props;
    if (handleImgClick) {
      handleImgClick(e);
    }
  }
  render() {
    const { 
      state: {
        loading, lazyloaded, showDefaultImg
      }, props: {
        classNames, parentClassNames,
        alt,
        size
      } 
    } = this;
    const containerClass = classnames('dynamicImgContainer prel layout row align-center justify-center',
    loading && 'lazyloading', lazyloaded && 'lazyloaded', parentClassNames, size==='prod-small' && 'addBorderOnDynamicImg');
    return (
      <React.Fragment>
        <div className={containerClass} ref={this.imageLoaderRef}>
          {!showDefaultImg && !loading && <img src={this.srcImage()} onClick={this.imgClick} className={classNames}/>}
          {showDefaultImg && !loading && <img onClick={this.imgClick} className="default-img" src="https://img.perniaspopupshop.com/pwa-images/default_img.png" />}
        </div>
        {/* {!showDefaultImg && <div className={containerClass}>
          <img src={this.srcImage()} onClick={this.imgClick} className={classNames} alt={alt} />
        </div>} */}
      </React.Fragment>
    )
  }
}