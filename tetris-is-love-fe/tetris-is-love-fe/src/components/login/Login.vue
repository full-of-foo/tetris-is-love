<template>
  <div class="mdl-grid">
    <div class="mdl-card mdl-cell mdl-cell--middle mdl-shadow--6dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white relative">
        <h2 class="mdl-card__title-text">Login</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input class="mdl-textfield__input" id="email" v-model="email" />
              <label class="mdl-textfield__label" for="email">Email</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="password" id="password" v-model="password" />
          <label class="mdl-textfield__label" for="password">Password</label>
        </div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <div class="mdl-grid">
          <button class="mdl-cell mdl-cell--12-col mdl-button mdl-button--raised mdl-button--colored mdl-js-button
                         mdl-js-ripple-effect mdl-color-text--white" @click="onSubmit">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
