import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import PassionView from './components/PassionView';
import AddItemsModal from './components/AddItemsModal';
import ItemView from './components/ItemView';
import PhotosView from './components/PhotosView';
import EditProfile from './components/EditProfile';

const RouterComponent = () => {

    return (
      <Router>
      <Scene key="root" hideNavBar>

        <Scene key="auth" >
          <Scene
            key="login"
            component={LoginForm}
            hideNavBar={true} />
          </Scene>

          <Scene key="main">
            <Scene key="homepage" component={HomePage} hideNavBar={true} initial/>
            <Scene
                key="passionView"
                hideNavBar={true}
                component={PassionView} />
                <Scene key="addItem"
                hideNavBar={true}
                component={AddItemsModal}/>
                <Scene
                  key="itemView"
                  hideNavBar={true}
                  component={ItemView} />
                <Scene
                  key="photosView"
                  hideNavBar={true}
                  component={PhotosView} />
                <Scene
                  key="editProfile"
                  hideNavBar={true}
                  component={EditProfile} />
          </Scene>

      </Scene>
      </Router>
    );
};

export default RouterComponent;
