import Vue from "vue";
import Vuex from "vuex";

var RoonApi = require("node-roon-api"),
    RoonApiTransport = require('node-roon-api-transport'),
    RoonApiImage = require('node-roon-api-image'),
    RoonApiBrowse = require('node-roon-api-browse');

var core;

var roon = new RoonApi({
    extension_id:        'com.marouim.fsimple-control',
    display_name:        'Marouim FSimple controls',
    display_version:     "1.0.0",
    publisher:           'Martin Ouimet',
    email:               'marouim@gmail.com',

    core_paired: function(core_) {
      state.current_zone_id = roon.load_config("current_zone_id");
      console.log("ZONE ID: " + roon.load_config("current_zone_id"));
      core = core_;

      core.services.RoonApiTransport.subscribe_zones((response, msg) => {
            if (response == "Subscribed") {
              let zones = msg.zones.reduce((p, e) => (p[e.zone_id] = e) && p, {});
              state.zones = msg.zones;
              console.log('zones Subscribed')
            } else if (response == "Changed") {
                var z;
              //   if (msg.zones_removed) msg.zones_removed.forEach(e => delete(state.zones[e.zone_id]));
              //   if (msg.zones_added)   msg.zones_added  .forEach(e => state.zones[e.zone_id] = e);
              // if (msg.zones_changed) msg.zones_changed.forEach(e => state.zones[e.zone_id] = e);
              console.log('zones changed')
            }
        });
        state.status = 'connected';

    },
    core_unpaired: function(core_) {
	      core = undefined;
        state.status = 'disconnected';
    }
});

roon.init_services({
    required_services:   [ RoonApiBrowse, RoonApiTransport, RoonApiImage ],
});

Vue.use(Vuex);

const UPDATE_CURRENT_ZONE_ID = "UPDATE_CURRENT_ZONE_ID";

const state = {
  status: "Connecting",
  current_zone_id: 0,
  zones: []
};

const mutations = {
  [UPDATE_CURRENT_ZONE_ID](state, data) {
    state.current_zone_id = data;
  },
};

const actions = {
  connect({ commit }) {
    roon.ws_connect({ host: "192.168.2.250", port: 9100, onclose: () => setTimeout(connect, 3000) });
  },

  pause() {
    console.log("PAUSE")
    console.log(state.zones)
    core.services.RoonApiTransport.control(state.current_zone_id, 'playpause');
  },

  update_current_zone({ commit }, zone_id) {
    roon.save_config("current_zone_id", zone_id);
    commit(UPDATE_CURRENT_ZONE_ID, zone_id);
  }
};

const getters = {
  status() {
    return state.status;
  },
  zones() {
    return state.zones;
  },
  current_zone_id() {
    return state.current_zone_id;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});