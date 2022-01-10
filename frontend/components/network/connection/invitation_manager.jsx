import React, { Component } from 'react'
import NavbarContainer from '../../feed/navbar/navbar_container';

export default class InvitationManager extends Component {
  render() {
    return (
      <div className="network-background">
        <NavbarContainer page="network" />
        <div className='invitations-manager-wrap'>

          {/* Invitation Manager Main */}
          <div>

          </div>

          {/* Project Bar */}
          <section className='project-info-bar'>
            <div className='project-info-text'>
              <h3>Project Description</h3>
              <p>RingIn is a clone of LinkedIn themed around J. R. R. Tolkien's The Lord of the Rings.</p>
              <p>This full stack project is built with...</p>
            </div>

            <ul>
              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>React</span>
                </div>
                <span className='post-info-item-desc'>Frontend structure</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Redux</span>
                </div>
                <span className='post-info-item-desc'>Frontend store</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Ruby on Rails</span>
                </div>
                <span className='post-info-item-desc'>Backend</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>PostgreSQL</span>
                </div>
                <span className='post-info-item-desc'>Database</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>AWS</span>
                </div>
                <span className='post-info-item-desc'>Media uploading and storage</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>HTML, CSS</span>
                </div>
                <span className='post-info-item-desc'></span>
              </li>
            </ul>

          </section>

        </div>
      </div>
    )
  }
}
