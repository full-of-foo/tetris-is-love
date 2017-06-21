<template>
<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <md-toolbar>
    <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>

    <h2 class="md-title">Tetris is Love</h2>
    <div class="mdl-layout-spacer"></div>
    <nav class="mdl-navigation">
      <md-button v-if="sessionManager.token" @click.native="logout">
        <md-icon class="mdl-cell mdl-cell--2-col">exit_to_app</md-icon>
      </md-button>
    </nav>
  </md-toolbar>

  <md-sidenav class="md-left" ref="leftSidenav">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <md-icon class="md-size-4x">favorite</md-icon>
      </div>
    </md-toolbar>

    <md-list>
      <md-list-item>
        <router-link to="/" @click.native="toggleLeftSidenav">
          <md-icon>home</md-icon> <span>Home</span>
        </router-link>
      </md-list-item>
      <md-list-item>
        <router-link v-if="!sessionManager.token"
                     to="/login" @click.native="toggleLeftSidenav">
          <md-icon>forward</md-icon> <span>Login</span>
        </router-link>
      </md-list-item>
      <md-list-item>
        <router-link v-if="sessionManager.token"
                     to="/play" @click.native="toggleLeftSidenav">
          <md-icon>gamepad</md-icon> <span>Play</span>
        </router-link>
      </md-list-item>
      <md-list-item>
        <router-link v-if="sessionManager.token"
                     to="/profile" @click.native="toggleLeftSidenav">
          <md-icon>account_circle</md-icon> <span>Profile</span>
        </router-link>
      </md-list-item>
    </md-list>
  </md-sidenav>

  <md-layout md-gutter>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </md-layout>
</div>
</template>
<script src="./index.js"></script>
