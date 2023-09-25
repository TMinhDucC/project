import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RatingsModule } from './ratings/ratings.module';
import { FavoritesModule } from './favorites/favorites.module';
import { BookingsModule } from './bookings/bookings.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule, RoomsModule, RatingsModule, FavoritesModule, BookingsModule, RolesModule, PermissionsModule, AuthModule,
    //  MongooseModule.forRoot('mongodb+srv://truongminhduc:123456%40@cluster0.dcjbayh.mongodb.net/mduc'),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
