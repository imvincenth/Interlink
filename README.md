# <p align="center"><img src="https://github.com/imvincenth/RingIn/blob/master/app/assets/images/namelogo.svg" /></p>

RingIn is a full stack LinkedIn clone themed around J. R. R. Tolkien's The Lord of the Rings series. 

Multi-stage sign up page
```
pageCheck() {
    if (this.props.errors.length === 7 || this.props.errors.length === 6 || this.props.errors.length === 0) {
      this.setState({ visiblePage: 1});
    } else if (this.props.errors.length === 5 || this.props.errors.length === 4) {
      this.setState({ visiblePage: 2 });
    } else if (this.props.errors.length === 3 || this.props.errors.length === 2) {
      this.setState({ visiblePage: 3 });
    } else if (this.props.errors.length === 1) {
      this.setState({ visiblePage: 4 });
    }
  }

  visibleCheck() {
    if (this.state.visiblePage === 1) {
      return this.pageOne();
    } else if (this.state.visiblePage === 2) {
      return this.pageTwo();
    } else if (this.state.visiblePage === 3) {
      return this.pageThree();
    } else {
      return this.pageFour();
    }
  }
  ```
  
  
