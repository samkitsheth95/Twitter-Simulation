import React, { Component } from 'react'
import '../../App.css'
import './Profile.css'
import axios from 'axios'
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { getProfile } from '../../actions'
import { connect } from 'react-redux'
import LeftNavbar from '../LeftNavbar/LeftNavbar'
import dotenv from 'dotenv'
import { Field, reduxForm } from 'redux-form';
import ROOT_URL from '../../constants.js'
import sampleImg from '../img/GrubhubDetails.jpg'

class Profile extends Component {
    // call the constructor method
    constructor(props) {
        // Call the constrictor of Super class i.e The Component
        super(props)
        // maintain the state required for this component
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            profilepic: '',
            coverpic: '',
            password: '',
            file: '',
            img: '',

            // following:false,
            follow: false
        }

    }

    componentWillMount() {

        this.setState({
            authFlag: false,
            authFailed: false,
            profilepic: '',
            // follow: false
        })

        // let kiran = {
        //     email: "arunb1620@gmail.com"
        // };
        // let temp = kiran.email
        let temp = sessionStorage.getItem('user_email')
        console.log(temp);
        let data = { email: temp }
        console.log(data.email)

        this.props.getProfile({ params: data }, (response) => {
            console.log(this.props.user)
            console.log(response.data);
            let img = '/images/profile/' + response.data.image
            this.setState({
                email: response.data.email,
                // phone: response.data.phone,
                password: response.data.password,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                profilepic: img,
                username: response.data.username,


            })
            console.log(this.state.follow)

        });

        let temp1 = sessionStorage.getItem('email')
        console.log(temp1);
        let data1 = { email: temp1 }
        console.log(data1.email)
        this.props.getProfile({ params: data1 }, (response) => {
            console.log(this.props.user)
            console.log(response.data);
            this.setState({
                // email: response.data.email,
                // // phone: response.data.phone,
                // password: response.data.password,
                // first_name: response.data.first_name,
                // last_name: response.data.last_name,
                // profilepic: img,
                // following : sessionStorage.getItem('user_email')
                // follow : 
                follow: response.data.following.includes(sessionStorage.getItem('user_email'))

            })

        });

    }



    followupdate = e => {
        // e.preventDefault();
        const data = {
            // following: sessionStorage.getItem('user_email'),
            following: sessionStorage.getItem('result'),
            email: sessionStorage.getItem('email'),
            flag: 0
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followupdate`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        following: response.data.following,
                        follow: true
                    });
                    alert("Following User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

            const data1 = {
                // new_email: sessionStorage.getItem('user_email'),
                new_email: sessionStorage.getItem('result'),
                followedBy: sessionStorage.getItem('email'),
                flag: 0
            }
            console.log(data1);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/followedupdate`, data1)
                .then(response => {
                    console.log("Status Code  is : ", response.status);
                    console.log(response.data1);
                    if (response.status === 200) {
                        this.setState({
                            followedBy: data1.followedBy,
                            // follow: true
                        });
                        alert("Followed By User Successfully");
                    } else {
                        console.log('Change failed !!! ');
    
                    }
    
                });

    }

    

    unfollow = e => {
        e.preventDefault();
        const data = {
            // following: sessionStorage.getItem('user_email'),
            following: sessionStorage.getItem('result'),
            email: sessionStorage.getItem('email'),
            flag: 1
        }
        console.log(data);
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/followupdate`, data)
            .then(response => {
                console.log("Status Code  is : ", response.status);
                console.log(response.data);
                if (response.status === 200) {
                    this.setState({
                        following: response.data.following,
                        follow: false
                    });
                    alert("Unfollowing User Successfully");
                } else {
                    console.log('Change failed !!! ');

                }

            });

            const data1 = {
                // new_email: sessionStorage.getItem('user_email'),
                new_email: sessionStorage.getItem('result'),
                followedBy: sessionStorage.getItem('email'),
                flag: 1
            }
            console.log(data);
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(`${ROOT_URL}/followedupdate`, data1)
                .then(response => {
                    console.log("Status Code  is : ", response.status);
                    console.log(data1);
                    if (response.status === 200) {
                        this.setState({
                            followedBy: data1.followedBy,
                            // follow: true
                        });
                        alert("UnFollowing User Successfully");
                    } else {
                        console.log('Change failed !!! ');
    
                    }
    
                });

    }


    render() {
        let change = null;
        console.log(this.props.user);
        // if (this.props.user.following.includes(sessionStorage.getItem('user_email'))) {
        if (!this.state.follow) {
            change = (
                <button type="button" style={{fontSize:'15.4px', borderRadius:'30px'}} class="btn btn-danger" onClick={this.followupdate} >Follow</button>
            )
        }
        else {
            change = (
                <button type="button" style={{fontSize:'15.4px', borderRadius:'30px'}} class="btn btn-danger" onClick={this.unfollow} >Following</button>
            )
        }

        return (
            <div>
                <div className="col-sm-2">
                    <LeftNavbar />
                </div>
                <div class='split-center_new'>
                    <h3
                        style={{
                            marginLeft: '20px',
                            fontWeight: '800',
                            fontSize: '19px'
                        }}
                    >
                        {this.state.username}
                    </h3>


                    <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                        <div class='preview text-center' >
                            <div>
                                <img class="product-holder "
                                    style={{ backgroundColo: "black" }}
                                    src={this.state.profilepic}
                                    width='1000'
                                    height='300'>

                                </img>
                                <img
                                    class="plus-image img-circle "
                                    style={{ backgroundColor: "black", border: "black" }}
                                    src={this.state.profilepic}
                                    width='200'
                                    height='200'
                                />
                                <input
                                    // class='browse-input'
                                    type='file'
                                    onChange={this.imageChangeHandler}
                                    name='myImage'
                                    id='myImage'
                                />
                                <br />
                            </div>
                        </div>
                    </form>
                    <div>
                    <br></br>
<br></br>   
                        
                        <ul class="list-inline">
                            <li> <a href="/profile/tweets" class="list-group-item">Tweets</a></li>
                            <li> <a href="#" class="list-group-item">Tweets and Replies</a></li>
                            <li> <a href="#" class="list-group-item">Media</a></li>
                            <li> <a href="/profile/likes" class="list-group-item">Likes</a></li>
                            <div style={{float :"right"}}>
                            {change}
                            </div>
                        </ul>
                        
                    </div>

                </div>
            </div>





        )
    }

}


function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { getProfile })(Profile);
