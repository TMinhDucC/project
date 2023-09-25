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

@Module({
  imports: [UsersModule, RoomsModule, RatingsModule, FavoritesModule, BookingsModule, RolesModule, PermissionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
