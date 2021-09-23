<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/plugins">Plugins</router-link>
  </div>
  <router-view/>
</template>

<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
:root {
  --dark-hard-blue: #070d17;
  --dark-blue: #182035;
  --purple: #513db0;
  --red: #ed3044;
  --white: white;
}
body{
  background-color: var(--dark-hard-blue);
  color: var(--white);
  font-family: 'Roboto', sans-serif;

}

#app {
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
