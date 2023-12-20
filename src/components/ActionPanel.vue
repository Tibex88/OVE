<script>
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

    <div class="border">
        <!-- <div class="border border-red-600"> -->
            <div class="flex flex-wrap">
                <div class="border group flex-1" v-for="n in 6">
                    <div class="relative">
                        <button>
                            MenuItem
                        </button>
                        
                        <ul class="absolute bg-white text-black z-[9999] rounded-b-md overflow-hidden">
                            <li class="hidden p-3  group-hover:block hover:bg-slate-200" v-for="n in 4">
                                subMenuList
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        <!-- </div> -->
    </div>

</template>


<style>

</style>