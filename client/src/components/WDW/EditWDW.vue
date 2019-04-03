<template>
  <div id="createForm">

    <v-layout row justify-space-around>
      <v-flex xs12 sm10 md8 lg6 color="white">
        <v-img height="200" :src="imageUrl">
          <v-layout wrap>
            <v-flex xs12>
              <v-progress-linear
                :active="loading"
                class="ma-0"
                color="green lighten-3"
                height="4"
                indeterminate
              ></v-progress-linear>
            </v-flex>
            <v-flex text-xs-right xs12>
              <v-tooltip bottom>
                <v-btn color="white" light fab small @click="onPickFile" slot="activator">
                  <v-icon class="grey--text">mdi-file-upload-outline</v-icon>
                  <input
                    type="file"
                    style="display: none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  />
                </v-btn>
                <span>Please upload your team image.</span>
              </v-tooltip>
            </v-flex>
            <v-layout column align-start justify-end pa-3>
              <h3 class="headline white--text">{{ name }}</h3>
              <span class="grey--text text--lighten-1">{{ description }}</span>
            </v-layout>
          </v-layout>
        </v-img>

        <v-form ref="newWDW" v-model="valid">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  outline
                  label="Team Name*"
                  prepend-inner-icon="group"
                  :rules="[rules.required]"
                  :persistentHint="true"
                  hint="Unique name of team"
                  validate-on-blur
                  ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="description"
                  outline
                  right
                  counter="255"
                  :rules="[rules.required, rules.max255]"
                  label="Description*"
                  prepend-inner-icon="comment"
                  :persistentHint="true"
                  hint="Short introduction for your team up to 255 characters."
                  validate-on-blur
                  ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-radio-group v-model="unit" row>
                  <template v-for="unit in units">
                    <v-radio :label="`${unit.name}`" :value="unit.name" :key="unit.name" :color="unit.branding"></v-radio>
                  </template>
                </v-radio-group>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="entity"
                  :items="entities"
                  outline
                  label="Entity*"
                  item-text="name"
                  item-value="_id"
                  prepend-inner-icon="business"
                  :rules="[rules.required]"
                  validate-on-blur
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.address + ', ' + data.item.country"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 sm6>
                <v-autocomplete
                  v-model="lead"
                  :items="leads"
                  outline
                  label="Lead*"
                  item-text="name"
                  item-value="_id"
                  prepend-inner-icon="person"
                  :rules="[rules.required]"
                  validate-on-blur
                >
                  <template v-slot:selection="data">
                    {{ data.item.name }}
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.email"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>

              <v-flex xs12 sm6>
                <v-text-field
                  v-model="phone"
                  outline
                  label="Phone*"
                  prepend-inner-icon="call"
                  :rules="[rules.required]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="fax"
                  outline
                  label="Fax"
                  prepend-inner-icon="print"
                  validate-on-blur
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="email"
                  outline
                  label="Email*"
                  prepend-inner-icon="mail"
                  :rules="[rules.required, rules.emailValid]"
                  validate-on-blur
                ></v-text-field>
              </v-flex>

              <v-flex xs11 sm5>
                <v-text-field
                  v-model="sip"
                  outline
                  label="Account ID"
                  :prepend-inner-icon="icons[icon].mdi"
                  :persistentHint="true"
                  :hint="`${ icons[icon].provider } (click app incon in right end for change the provider)`"
                  validate-on-blur
                  ></v-text-field>
                </v-flex>
              <v-flex xs1>
                <v-menu offet-y>
                  <template v-slot:activator="{ on }">
                    <v-btn icon class="grey--text" v-on="on">
                      <v-icon>mdi-apps</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile v-for="(item, key) in icons" :key="key" @click="icon = key">
                      <v-icon left>{{ icons[key].mdi }}</v-icon>
                      <v-list-tile-title>{{ icons[key].provider }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-flex>

              <v-flex xs12>
                <v-textarea
                  v-model="remark"
                  outline
                  label="Addition Information"
                  prepend-inner-icon="mdi-calendar-edit"
                  :persistent-hint="true"
                  hint="Availability of teams, office hours, weekdays, seasons also emergency supports."
                  validate-on-blur
                ></v-textarea>
              </v-flex>

              <v-flex xs12>
                <v-divider></v-divider>

                <v-autocomplete
                  v-model="selectedTags"
                  :items="tagSelections"
                  outline
                  chips
                  label="Tags"
                  item-text="name"
                  item-value="_id"
                  multiple
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :selected="data.selected"
                      close
                      class="chip--select-multi"
                      @input="remove(data.item)"
                    >
                      <v-avatar color="success">
                        {{ data.item.avatar }}
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item">@</v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>

                <v-divider></v-divider>
              </v-flex>

              <v-layout row v-if="error">
                <v-flex>
                  <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
              </v-layout>
              <v-layout row justify-end align-end>
                  <v-spacer></v-spacer>
                  <v-btn left flat class="grey--text" @click="cancel">Clear</v-btn>
                  <v-btn left flat :loading="loading" :disabled="!valid" color="success" @click="save">Save</v-btn>
              </v-layout>


            </v-layout>
          </v-container>
        </v-form>

      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  }
}
</script>
