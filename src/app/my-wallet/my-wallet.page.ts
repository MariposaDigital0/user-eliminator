import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { WithdrawPage } from '../modals/withdraw/withdraw.page';
import { MyWalletService } from '../_services/my-wallet.service';
import { Plugins } from "@capacitor/core";
const { AllInOneSDK } = Plugins;

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.page.html',
  styleUrls: ['./my-wallet.page.scss'],
})
export class MyWalletPage implements OnInit {

  private userData
  walletBal= {
    'wal_bal':'200',
    'win_bal':'170'
  };
  txn_data:{};
  addmoneyamount: number;
  checksum: string;
  oid: string;

  constructor(

    private modalController: ModalController,
    private walletService:MyWalletService,
    private alertController:AlertController




    ) {
      // this.commonService.updateWallet.subscribe(data=>{
      //   let win_bal=parseInt(this.walletBal.win_bal)-data
      //   this.walletBal.win_bal=""+win_bal
      // })

    }

  //   initializeApp() {
  //     this.platform.ready().then(() => registerWebPlugin(AllInOneSDK));
  // }
  ngOnInit() {


  }
  ionViewWillEnter() {
    this.ngOnInit();
}
  dismiss() {
    this.modalController.dismiss()
  }




    async openWithdrawModel(win_bal) {

      const modal = await this.modalController.create({
        component: WithdrawPage,
        componentProps: {
          "win_bal":win_bal

        }
      });
      return await modal.present();
    }
    async AddMoneyAlert() {
      let form=new FormData()

      this.walletService.getCheckSum(form).subscribe(res=>{
        console.log(res)
        this.oid=res.oid
        this.checksum=res.checksum

      })
      const alert = await this.alertController.create({
        cssClass: 'my-wallet-alert-class',
        header: 'Add Money',
        inputs: [
          {
            name: 'amount',
            type: 'number',
            cssClass: 'i1',
            placeholder: 'Enter Amount'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'b1',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Add',
            cssClass: 'b2',
            handler: async(data) => {
             this.addmoneyamount=data.amount
            console.log(typeof(this.checksum))
            console.log(typeof(this.oid))
             //console.log( Math.random().toString(36).substr(2, 9))
             let response =await AllInOneSDK.startTransaction({
              mid: "DMGixy91604394681695",
              amount: this.addmoneyamount,
              orderId: this.oid,
              callbackUrl: "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID="+this.oid,
              txnToken: this.checksum,
              isStaging: true,
              restrictAppInvoke: true });
                 }
          }
        ]
      });

      await alert.present();
    }
   async addMoney(){


      let response = await AllInOneSDK.startTransaction({
        mid:'eVExLv25221231925149', amount:this.addmoneyamount, orderId:this.oid, callbackUrl:"https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=<order_id>",
       txnToken:this.checksum, isStaging:false, restrictAppInvoke:true });





    }

  }
