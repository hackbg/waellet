<template>
    <div>
        <div class="popup">
            <div class="actions">
                <button class="backbutton toAccount" @click="navigateFungibleTokens"><ae-icon name="back" /> {{$t('pages.addFungibleToken.backToFungibleTokens')}}</button>
            </div>
            <h3>{{$t('pages.mintTokenPage.mint') }}</h3>
            <div>
                <ae-panel>
                    <h4>{{$t('pages.mintTokenPage.mint') }}</h4>
                    <hr>
                    <select class="dropdown-menu" @change="onChangeType($event)">
                        <option value="mint">Mint</option>
                        <option value="burn">Burn</option>
                    </select>
                    <select class="dropdown-menu" @change="onChange($event)">
                        <option value="default" disabled>{{$t('pages.allowances.chooseToken')}}</option>
                        <option 
                            v-for="(tok, key) in fungibleTokens" 
                            :key="key" 
                            :value="key">
                            {{tok.name}}
                        </option>
                    </select>
                    <AddressInput @update="(val) => address = val" v-if="type == 'mint'" />
                    <!-- <div class="input-container">
                        <ae-input :label="$t('pages.mintTokenPage.amount') " >
                            <input type="text" class="ae-input token-contract" v-model="amount" slot-scope="{ context }" @focus="context.focus = true" @blur="context.focus = false" />
                            <ae-toolbar slot="footer" v-if="errorAmount">
                                {{errorAmount}}
                            </ae-toolbar>
                        </ae-input>
                    </div> -->
                    
                    <AmountInput :amount="amount" @update="(val) => amount = val" :error="errorAmount" />

                    <ae-button face="round" fill="primary" @click="mint" class="to-confirm-add" extend >{{$t('pages.mintTokenPage.mintBtn') }}</ae-button>
                </ae-panel>
            </div>
        </div>
        <popup :popupSecondBtnClick="popup.secondBtnClick"></popup>
        <Loader size="big" :loading="loading" type="transparent" ></Loader>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FUNGIBLE_TOKEN_CONTRACT } from '../../utils/constants';

export default {
    data() {
        return {
            loading:false,
            token:0,
            amount:null,
            address:null,
            errorAddress:null,
            errorAmount: null,
            type:'mint'
        }
    },
    computed: {
        ...mapGetters(['sdk','account','tokens','popup']),
        fungibleTokens() {
            return this.tokens.filter((t,index) => {
                t.key = index;
                return t.parent == this.account.publicKey && t.name != 'AE'
            });
        }
    },
    async created() {

    },
    methods:{
        navigateFungibleTokens() {
            this.$router.push('/fungible-tokens')
        },
        onChange(event) {
            this.token = event.target.value;
        },
        onChangeType(event) {
            this.type = event.target.value;
        },
        mint() {
            if(!this.amount || isNaN(this.amount)) {
                this.errorAmount = this.$t('pages.mintTokenPage.enterAmount')
                this.$store.dispatch('popupAlert', { name: 'spend', type: 'incorrect_amount'});
            } else if(!this.address && this.type == 'mint') {
                this.errorAddress = this.$t('pages.mintTokenPage.enterAddress')
                this.$store.dispatch('popupAlert', { name: 'spend', type: 'incorrect_address'});
            } else {
                let params = []
                if(this.type == 'mint') {
                    params = [
                        this.address,
                        this.amount
                    ]
                } else if (this.type == 'burn') {
                    params = [
                        this.amount
                    ]
                }
                let tx = {
                    popup:false,
                    tx: {
                        source:     FUNGIBLE_TOKEN_CONTRACT,
                        address:    this.fungibleTokens[this.token].contract,
                        method:     this.type, 
                        params,
                        amount:     0
                    },
                    callType: 'pay',
                    type:'contractCall'
                }
                this.$store.commit('SET_AEPP_POPUP',true)
                this.$router.push({'name':'sign', params: {
                    data:tx
                }});
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../common/base';


</style>
