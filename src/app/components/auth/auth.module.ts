import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouting } from "./auth.routing";
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from "../../material/material.module";
//tengo que importar los modulos//
import { RegisterModule } from "./register/register.module";
import { LoginModule } from "./login/login.module";
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module";
import { SendEmailComponent } from "./send-email/send-email.component";

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//import { MatCarouselModule, MatCarousel} from '@ngmodule/material-carousel';
@NgModule({
  declarations: [SendEmailComponent,],
  imports: [CommonModule,AuthRouting,RegisterModule,LoginModule,ForgotPasswordModule,MaterialModule,HttpClientModule,
  //  MatCarouselModule.forRoot(),
  ],
  exports: [AuthRouting,RegisterModule,LoginModule,ForgotPasswordModule,SendEmailComponent
  ],
  providers:[

  ]
})
export class AuthModule { }
