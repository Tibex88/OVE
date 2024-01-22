import {
    createStore
} from "vuex";
import castModule from "./modules/cast";
import subtitleModule from "./modules/subtitle";
import movieModule from "./modules/movie";

const store = createStore({
    modules: {
        cast: castModule,
        subtitle: subtitleModule, 
        movie: movieModule, 
    },

});

export default store;