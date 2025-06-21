<template>
  <q-dialog
    :model-value="show"
    persistent
    @update:model-value="$emit('update:show', $event)"
    maximized
  >
    <q-card class="text-center bg-background text-background">
      <q-card-section>
        <div class="text-weight-medium">{{ $t('component.simple_order_dialog.headline') }}</div>
        <div class="text-subtitle2">{{ recipe.name }}</div>
      </q-card-section>
      <q-separator :dark="color.backgroundDark" />
      <q-card-section>
        <div class="row q-gutter-md justify-center">
          <q-btn
            no-caps
            :color="selected === 'default' ? 'positive' : 'secondary'"
            @click="select('default')"
          >
            {{ $t('component.simple_order_dialog.default_label', { nr: recommendedAmount }) }}
          </q-btn>
          <q-btn
            no-caps
            :color="selected === 'checker' ? 'positive' : 'secondary'"
            @click="select('checker')"
          >
            {{ $t('component.simple_order_dialog.checker_label', { nr: checkerAmount }) }}
          </q-btn>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          color="positive"
          no-caps
          :disable="!selected || ordering"
          :loading="ordering"
          @click="onMakeCocktail"
        >
          {{ $t('component.simple_order_dialog.make_btn_label') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import GlassService from '../services/glass.service'
import CocktailService from '../services/cocktail.service'

export default {
  name: 'CSimpleOrderDialog',
  props: {
    show: { type: Boolean, default: false },
    recipe: { type: Object, required: true }
  },
  emits: ['update:show', 'postOrder'],
  data () {
    return {
      availableGlasses: [],
      selected: null,
      ordering: false
    }
  },
  created () {
    GlassService.getAllGlasses().then(g => {
      this.availableGlasses = g
    })
  },
  computed: {
    ...mapGetters({
      color: 'appearance/getNormalColors'
    }),
    recommendedAmount () {
      return this.recipe?.defaultGlass?.size || 250
    },
    checkerAmount () {
      if (this.availableGlasses.length === 0) {
        return this.recommendedAmount * 2
      }
      return Math.max(...this.availableGlasses.map(x => x.size))
    }
  },
  methods: {
    select (val) {
      this.selected = val
    },
    onMakeCocktail () {
      const amount = this.selected === 'checker' ? this.checkerAmount : this.recommendedAmount
      const config = {
        amountOrderedInMl: amount,
        customisations: { boost: 100, additionalIngredients: [] },
        ingredientGroupReplacements: []
      }
      this.ordering = true
      CocktailService.order(this.recipe.id, config, this.recipe.type === 'ingredientrecipe')
        .then(() => {
          this.$emit('postOrder')
        })
        .finally(() => {
          this.ordering = false
        })
    }
  }
}
</script>

<style scoped>
</style>

