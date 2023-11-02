import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { RoomsModule } from './rooms/rooms.module'
import { RatingsModule } from './ratings/ratings.module'
import { FavoritesModule } from './favorites/favorites.module'
import { BookingsModule } from './bookings/bookings.module'
import { RolesModule } from './roles/roles.module'
import { PermissionsModule } from './permissions/permissions.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
import { ConfigService, ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin)
          return connection
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RoomsModule,
    RatingsModule,
    FavoritesModule,
    BookingsModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
