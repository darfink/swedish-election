import axios from 'axios';
import { feature } from 'topojson-client';

export default {
  state: [],
  reducers: {
    setTopology(state, payload) {
      let objects = payload.objects;
      let defaultObject = objects[Object.keys(objects)[0]];

      return feature(payload, defaultObject).features;
    },
  },
  effects: {
    async fetchTopojson(payload) {
      this.setTopology((await axios.get(payload)).data);
    },
  },
}