import Vue from "vue";
import Vuex from "vuex";
import helpers from "./helpers";

var RoonApi = require("node-roon-api"),
    RoonApiTransport = require('node-roon-api-transport'),
    RoonApiImage = require('node-roon-api-image'),
    RoonApiBrowse = require('node-roon-api-browse');

var roon;

var serverIp = "192.168.2.250"
var serverPort = "9100"

Vue.use(Vuex);

const clonedeep = require('lodash.clonedeep')

const UPDATE_CURRENT_ZONE_ID = "UPDATE_CURRENT_ZONE_ID";
const UPDATE_ZONE = "UPDATE_ZONE";
const UPDATE_ZONE_LIST = "UPDATE_ZONE_LIST";
const CORE_PAIRED = "CORE_PAIRED";
const CORE_UNPAIRED = "CORE_UNPAIRED";
const SUBSCRIBE_ZONES = "SUBSCRIBE_ZONES";
const ZONES_CHANGED = "ZONES_CHANGED";
const ZONES_SEEK_CHANGED = "ZONES_SEEK_CHANGED"
const UPDATE_SEEK = "UPDATE_SEEK"
const PLAYPAUSE = "PLAYPAUSE"
const NEXT = "NEXT"
const PREVIOUS = "PREVIOUS"

const state = {
  status: "Connecting",
  current_zone_id: "",
  zones: [],
  core: undefined
};

const mutations = {
  [UPDATE_CURRENT_ZONE_ID](state, data) {
    state.current_zone_id = data;
  },

  [ZONES_CHANGED](state, zones) {
    console.log("MUTATION: ZONES_CHANGED")
    console.log(zones)
    zones.forEach(e => state.zones[state.zones.findIndex(z => z.zone_id == e.zone_id)] = e)

    state.zones = clonedeep(state.zones)
  },

  [ZONES_SEEK_CHANGED](state, zones) {
    console.log("MUTATION: ZONES_SEEK_CHANGED")
    console.log(zones)

    zones.forEach(e => state.zones[state.zones.findIndex(z => z.zone_id == e.zone_id)].now_playing.seek_position = e.seek_position)

    state.zones = clonedeep(state.zones)
  },
    
  [SUBSCRIBE_ZONES](state, zones) {
    console.log("MUTATION: SUBSCRIBE_ZONES")
    state.zones = zones;
  },

  [CORE_PAIRED](state, core) {
    console.log("CORE PAIRED")
    state.core = core
  },

  [CORE_UNPAIRED](state) {
    console.log("CORE UNPAIRED")
    state.core = undefined
  },

  [UPDATE_SEEK](state, seek) {
    state.core.services.RoonApiTransport.seek(state.current_zone_id, "absolute", seek);
  },

  [PLAYPAUSE](state) {
    state.core.services.RoonApiTransport.control(state.current_zone_id, "playpause");
  },
  [NEXT](state) {
    state.core.services.RoonApiTransport.control(state.current_zone_id, "next");
  },
  [PREVIOUS](state) {
    state.core.services.RoonApiTransport.control(state.current_zone_id, "previous");
  },
};


const actions = {
  core_pair({ commit }) {

    roon = new RoonApi({
      extension_id: 'com.marouim.fsimple-control',
      display_name: 'Marouim FSimple controls',
      display_version: "1.0.0",
      publisher: 'Martin Ouimet',
      email: 'marouim@gmail.com',
      
      core_paired: function (_core) {
        commit(UPDATE_CURRENT_ZONE_ID, roon.load_config("current_zone_id"))
        _core.services.RoonApiTransport.subscribe_zones((response, msg) => {
          if (response == "Subscribed") {
            commit(SUBSCRIBE_ZONES, msg.zones)
            console.log('zones Subscribed')
          }
          else if (response == "Changed") {
            if (msg.zones_changed) commit(ZONES_CHANGED, msg.zones_changed)
            if (msg.zones_seek_changed) commit(ZONES_SEEK_CHANGED, msg.zones_seek_changed)

          }


        })

        commit(CORE_PAIRED, _core)
      },

      core_unpaired: function (_core) {
        commit(CORE_UNPAIRED)
      }
    })

    roon.init_services({
        required_services:   [ RoonApiBrowse, RoonApiTransport, RoonApiImage ],
    });

    roon.ws_connect({ host: serverIp, port: serverPort, onclose: () => setTimeout(connect, 3000) });
    
  },

  update_seek({ commit }, seek) {
    console.log("seek: " + seek)

    commit(UPDATE_SEEK, seek)
  },

  pause() {
    console.log("PAUSE")
    console.log(state.zones)
    core.services.RoonApiTransport.control(state.current_zone_id, 'playpause');
  },

  update_current_zone({ commit }, zone_id) {
    console.log("UPDATE CURRENT ZONE ID: " + zone_id)
    roon.save_config("current_zone_id", zone_id);
    commit(UPDATE_CURRENT_ZONE_ID, zone_id);
  },

  playpause({ commit }) {
    commit(PLAYPAUSE);
  },

  next({ commit }) {
    commit(NEXT);
  },

  previous({ commit }) {
    commit(PREVIOUS);
  }
};

const getters = {
  status() {
    return state.status;
  },

  is_loading() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id);
    return current_zone.state == "loading"
  },
  
  is_playing() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id);
    return current_zone.state == "playing"
  },

  is_paused() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id);
    return current_zone.state == "paused"
  },
    
  zones() {
    return state.zones;
  },
  current_zone() {
    return state.zones.find(z => z.zone_id == state.current_zone_id)
  },
  current_zone_id() {
    return state.current_zone_id;
  },

  roon() {
    return roon;
  },

  now_playing_seek_time() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id);
    return helpers.seek_to_time(current_zone.now_playing.seek_position);
  },

  now_playing_length_time() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id);
    return helpers.seek_to_time(current_zone.now_playing.length);
  },

  now_playing_image_url() {
    let current_zone = state.zones.find(z => z.zone_id == state.current_zone_id)

    return "http://" + serverIp + ":" + serverPort + "/api/image/" + current_zone.now_playing.image_key

  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});