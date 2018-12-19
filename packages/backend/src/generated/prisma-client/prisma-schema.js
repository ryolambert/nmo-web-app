module.exports = {
        typeDefs: /* GraphQL */ `type Activity {
  id: ID!
  name: String!
  recAreas: RecArea!
}

type ActivityConnection {
  pageInfo: PageInfo!
  edges: [ActivityEdge]!
  aggregate: AggregateActivity!
}

input ActivityCreateInput {
  name: String!
  recAreas: RecAreaCreateOneWithoutActivitiesInput!
}

input ActivityCreateManyWithoutRecAreasInput {
  create: [ActivityCreateWithoutRecAreasInput!]
  connect: [ActivityWhereUniqueInput!]
}

input ActivityCreateWithoutRecAreasInput {
  name: String!
}

type ActivityEdge {
  node: Activity!
  cursor: String!
}

enum ActivityOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ActivityPreviousValues {
  id: ID!
  name: String!
}

input ActivityScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [ActivityScalarWhereInput!]
  OR: [ActivityScalarWhereInput!]
  NOT: [ActivityScalarWhereInput!]
}

type ActivitySubscriptionPayload {
  mutation: MutationType!
  node: Activity
  updatedFields: [String!]
  previousValues: ActivityPreviousValues
}

input ActivitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActivityWhereInput
  AND: [ActivitySubscriptionWhereInput!]
  OR: [ActivitySubscriptionWhereInput!]
  NOT: [ActivitySubscriptionWhereInput!]
}

input ActivityUpdateInput {
  name: String
  recAreas: RecAreaUpdateOneRequiredWithoutActivitiesInput
}

input ActivityUpdateManyDataInput {
  name: String
}

input ActivityUpdateManyMutationInput {
  name: String
}

input ActivityUpdateManyWithoutRecAreasInput {
  create: [ActivityCreateWithoutRecAreasInput!]
  delete: [ActivityWhereUniqueInput!]
  connect: [ActivityWhereUniqueInput!]
  disconnect: [ActivityWhereUniqueInput!]
  update: [ActivityUpdateWithWhereUniqueWithoutRecAreasInput!]
  upsert: [ActivityUpsertWithWhereUniqueWithoutRecAreasInput!]
  deleteMany: [ActivityScalarWhereInput!]
  updateMany: [ActivityUpdateManyWithWhereNestedInput!]
}

input ActivityUpdateManyWithWhereNestedInput {
  where: ActivityScalarWhereInput!
  data: ActivityUpdateManyDataInput!
}

input ActivityUpdateWithoutRecAreasDataInput {
  name: String
}

input ActivityUpdateWithWhereUniqueWithoutRecAreasInput {
  where: ActivityWhereUniqueInput!
  data: ActivityUpdateWithoutRecAreasDataInput!
}

input ActivityUpsertWithWhereUniqueWithoutRecAreasInput {
  where: ActivityWhereUniqueInput!
  update: ActivityUpdateWithoutRecAreasDataInput!
  create: ActivityCreateWithoutRecAreasInput!
}

input ActivityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  recAreas: RecAreaWhereInput
  AND: [ActivityWhereInput!]
  OR: [ActivityWhereInput!]
  NOT: [ActivityWhereInput!]
}

input ActivityWhereUniqueInput {
  id: ID
}

type AggregateActivity {
  count: Int!
}

type AggregateFavorite {
  count: Int!
}

type AggregateImage {
  count: Int!
}

type AggregateRecArea {
  count: Int!
}

type AggregateReview {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Favorite {
  id: ID!
  user: User!
  recArea: RecArea!
}

type FavoriteConnection {
  pageInfo: PageInfo!
  edges: [FavoriteEdge]!
  aggregate: AggregateFavorite!
}

input FavoriteCreateInput {
  user: UserCreateOneWithoutFavoritesInput!
  recArea: RecAreaCreateOneWithoutFavoritesInput!
}

input FavoriteCreateManyWithoutRecAreaInput {
  create: [FavoriteCreateWithoutRecAreaInput!]
  connect: [FavoriteWhereUniqueInput!]
}

input FavoriteCreateManyWithoutUserInput {
  create: [FavoriteCreateWithoutUserInput!]
  connect: [FavoriteWhereUniqueInput!]
}

input FavoriteCreateWithoutRecAreaInput {
  user: UserCreateOneWithoutFavoritesInput!
}

input FavoriteCreateWithoutUserInput {
  recArea: RecAreaCreateOneWithoutFavoritesInput!
}

type FavoriteEdge {
  node: Favorite!
  cursor: String!
}

enum FavoriteOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FavoritePreviousValues {
  id: ID!
}

input FavoriteScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  AND: [FavoriteScalarWhereInput!]
  OR: [FavoriteScalarWhereInput!]
  NOT: [FavoriteScalarWhereInput!]
}

type FavoriteSubscriptionPayload {
  mutation: MutationType!
  node: Favorite
  updatedFields: [String!]
  previousValues: FavoritePreviousValues
}

input FavoriteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FavoriteWhereInput
  AND: [FavoriteSubscriptionWhereInput!]
  OR: [FavoriteSubscriptionWhereInput!]
  NOT: [FavoriteSubscriptionWhereInput!]
}

input FavoriteUpdateInput {
  user: UserUpdateOneRequiredWithoutFavoritesInput
  recArea: RecAreaUpdateOneRequiredWithoutFavoritesInput
}

input FavoriteUpdateManyWithoutRecAreaInput {
  create: [FavoriteCreateWithoutRecAreaInput!]
  delete: [FavoriteWhereUniqueInput!]
  connect: [FavoriteWhereUniqueInput!]
  disconnect: [FavoriteWhereUniqueInput!]
  update: [FavoriteUpdateWithWhereUniqueWithoutRecAreaInput!]
  upsert: [FavoriteUpsertWithWhereUniqueWithoutRecAreaInput!]
  deleteMany: [FavoriteScalarWhereInput!]
}

input FavoriteUpdateManyWithoutUserInput {
  create: [FavoriteCreateWithoutUserInput!]
  delete: [FavoriteWhereUniqueInput!]
  connect: [FavoriteWhereUniqueInput!]
  disconnect: [FavoriteWhereUniqueInput!]
  update: [FavoriteUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [FavoriteUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [FavoriteScalarWhereInput!]
}

input FavoriteUpdateWithoutRecAreaDataInput {
  user: UserUpdateOneRequiredWithoutFavoritesInput
}

input FavoriteUpdateWithoutUserDataInput {
  recArea: RecAreaUpdateOneRequiredWithoutFavoritesInput
}

input FavoriteUpdateWithWhereUniqueWithoutRecAreaInput {
  where: FavoriteWhereUniqueInput!
  data: FavoriteUpdateWithoutRecAreaDataInput!
}

input FavoriteUpdateWithWhereUniqueWithoutUserInput {
  where: FavoriteWhereUniqueInput!
  data: FavoriteUpdateWithoutUserDataInput!
}

input FavoriteUpsertWithWhereUniqueWithoutRecAreaInput {
  where: FavoriteWhereUniqueInput!
  update: FavoriteUpdateWithoutRecAreaDataInput!
  create: FavoriteCreateWithoutRecAreaInput!
}

input FavoriteUpsertWithWhereUniqueWithoutUserInput {
  where: FavoriteWhereUniqueInput!
  update: FavoriteUpdateWithoutUserDataInput!
  create: FavoriteCreateWithoutUserInput!
}

input FavoriteWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  recArea: RecAreaWhereInput
  AND: [FavoriteWhereInput!]
  OR: [FavoriteWhereInput!]
  NOT: [FavoriteWhereInput!]
}

input FavoriteWhereUniqueInput {
  id: ID
}

type Image {
  id: ID!
  user: User!
  recArea: RecArea
  review: Review
  image: String!
  largeImage: String
}

type ImageConnection {
  pageInfo: PageInfo!
  edges: [ImageEdge]!
  aggregate: AggregateImage!
}

input ImageCreateInput {
  user: UserCreateOneWithoutImagesInput!
  recArea: RecAreaCreateOneWithoutImagesInput
  review: ReviewCreateOneWithoutImagesInput
  image: String!
  largeImage: String
}

input ImageCreateManyWithoutRecAreaInput {
  create: [ImageCreateWithoutRecAreaInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateManyWithoutReviewInput {
  create: [ImageCreateWithoutReviewInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateManyWithoutUserInput {
  create: [ImageCreateWithoutUserInput!]
  connect: [ImageWhereUniqueInput!]
}

input ImageCreateWithoutRecAreaInput {
  user: UserCreateOneWithoutImagesInput!
  review: ReviewCreateOneWithoutImagesInput
  image: String!
  largeImage: String
}

input ImageCreateWithoutReviewInput {
  user: UserCreateOneWithoutImagesInput!
  recArea: RecAreaCreateOneWithoutImagesInput
  image: String!
  largeImage: String
}

input ImageCreateWithoutUserInput {
  recArea: RecAreaCreateOneWithoutImagesInput
  review: ReviewCreateOneWithoutImagesInput
  image: String!
  largeImage: String
}

type ImageEdge {
  node: Image!
  cursor: String!
}

enum ImageOrderByInput {
  id_ASC
  id_DESC
  image_ASC
  image_DESC
  largeImage_ASC
  largeImage_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ImagePreviousValues {
  id: ID!
  image: String!
  largeImage: String
}

input ImageScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  largeImage: String
  largeImage_not: String
  largeImage_in: [String!]
  largeImage_not_in: [String!]
  largeImage_lt: String
  largeImage_lte: String
  largeImage_gt: String
  largeImage_gte: String
  largeImage_contains: String
  largeImage_not_contains: String
  largeImage_starts_with: String
  largeImage_not_starts_with: String
  largeImage_ends_with: String
  largeImage_not_ends_with: String
  AND: [ImageScalarWhereInput!]
  OR: [ImageScalarWhereInput!]
  NOT: [ImageScalarWhereInput!]
}

type ImageSubscriptionPayload {
  mutation: MutationType!
  node: Image
  updatedFields: [String!]
  previousValues: ImagePreviousValues
}

input ImageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ImageWhereInput
  AND: [ImageSubscriptionWhereInput!]
  OR: [ImageSubscriptionWhereInput!]
  NOT: [ImageSubscriptionWhereInput!]
}

input ImageUpdateInput {
  user: UserUpdateOneRequiredWithoutImagesInput
  recArea: RecAreaUpdateOneWithoutImagesInput
  review: ReviewUpdateOneWithoutImagesInput
  image: String
  largeImage: String
}

input ImageUpdateManyDataInput {
  image: String
  largeImage: String
}

input ImageUpdateManyMutationInput {
  image: String
  largeImage: String
}

input ImageUpdateManyWithoutRecAreaInput {
  create: [ImageCreateWithoutRecAreaInput!]
  delete: [ImageWhereUniqueInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  update: [ImageUpdateWithWhereUniqueWithoutRecAreaInput!]
  upsert: [ImageUpsertWithWhereUniqueWithoutRecAreaInput!]
  deleteMany: [ImageScalarWhereInput!]
  updateMany: [ImageUpdateManyWithWhereNestedInput!]
}

input ImageUpdateManyWithoutReviewInput {
  create: [ImageCreateWithoutReviewInput!]
  delete: [ImageWhereUniqueInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  update: [ImageUpdateWithWhereUniqueWithoutReviewInput!]
  upsert: [ImageUpsertWithWhereUniqueWithoutReviewInput!]
  deleteMany: [ImageScalarWhereInput!]
  updateMany: [ImageUpdateManyWithWhereNestedInput!]
}

input ImageUpdateManyWithoutUserInput {
  create: [ImageCreateWithoutUserInput!]
  delete: [ImageWhereUniqueInput!]
  connect: [ImageWhereUniqueInput!]
  disconnect: [ImageWhereUniqueInput!]
  update: [ImageUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ImageUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ImageScalarWhereInput!]
  updateMany: [ImageUpdateManyWithWhereNestedInput!]
}

input ImageUpdateManyWithWhereNestedInput {
  where: ImageScalarWhereInput!
  data: ImageUpdateManyDataInput!
}

input ImageUpdateWithoutRecAreaDataInput {
  user: UserUpdateOneRequiredWithoutImagesInput
  review: ReviewUpdateOneWithoutImagesInput
  image: String
  largeImage: String
}

input ImageUpdateWithoutReviewDataInput {
  user: UserUpdateOneRequiredWithoutImagesInput
  recArea: RecAreaUpdateOneWithoutImagesInput
  image: String
  largeImage: String
}

input ImageUpdateWithoutUserDataInput {
  recArea: RecAreaUpdateOneWithoutImagesInput
  review: ReviewUpdateOneWithoutImagesInput
  image: String
  largeImage: String
}

input ImageUpdateWithWhereUniqueWithoutRecAreaInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateWithoutRecAreaDataInput!
}

input ImageUpdateWithWhereUniqueWithoutReviewInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateWithoutReviewDataInput!
}

input ImageUpdateWithWhereUniqueWithoutUserInput {
  where: ImageWhereUniqueInput!
  data: ImageUpdateWithoutUserDataInput!
}

input ImageUpsertWithWhereUniqueWithoutRecAreaInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateWithoutRecAreaDataInput!
  create: ImageCreateWithoutRecAreaInput!
}

input ImageUpsertWithWhereUniqueWithoutReviewInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateWithoutReviewDataInput!
  create: ImageCreateWithoutReviewInput!
}

input ImageUpsertWithWhereUniqueWithoutUserInput {
  where: ImageWhereUniqueInput!
  update: ImageUpdateWithoutUserDataInput!
  create: ImageCreateWithoutUserInput!
}

input ImageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  recArea: RecAreaWhereInput
  review: ReviewWhereInput
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  largeImage: String
  largeImage_not: String
  largeImage_in: [String!]
  largeImage_not_in: [String!]
  largeImage_lt: String
  largeImage_lte: String
  largeImage_gt: String
  largeImage_gte: String
  largeImage_contains: String
  largeImage_not_contains: String
  largeImage_starts_with: String
  largeImage_not_starts_with: String
  largeImage_ends_with: String
  largeImage_not_ends_with: String
  AND: [ImageWhereInput!]
  OR: [ImageWhereInput!]
  NOT: [ImageWhereInput!]
}

input ImageWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createActivity(data: ActivityCreateInput!): Activity!
  updateActivity(data: ActivityUpdateInput!, where: ActivityWhereUniqueInput!): Activity
  updateManyActivities(data: ActivityUpdateManyMutationInput!, where: ActivityWhereInput): BatchPayload!
  upsertActivity(where: ActivityWhereUniqueInput!, create: ActivityCreateInput!, update: ActivityUpdateInput!): Activity!
  deleteActivity(where: ActivityWhereUniqueInput!): Activity
  deleteManyActivities(where: ActivityWhereInput): BatchPayload!
  createFavorite(data: FavoriteCreateInput!): Favorite!
  updateFavorite(data: FavoriteUpdateInput!, where: FavoriteWhereUniqueInput!): Favorite
  upsertFavorite(where: FavoriteWhereUniqueInput!, create: FavoriteCreateInput!, update: FavoriteUpdateInput!): Favorite!
  deleteFavorite(where: FavoriteWhereUniqueInput!): Favorite
  deleteManyFavorites(where: FavoriteWhereInput): BatchPayload!
  createImage(data: ImageCreateInput!): Image!
  updateImage(data: ImageUpdateInput!, where: ImageWhereUniqueInput!): Image
  updateManyImages(data: ImageUpdateManyMutationInput!, where: ImageWhereInput): BatchPayload!
  upsertImage(where: ImageWhereUniqueInput!, create: ImageCreateInput!, update: ImageUpdateInput!): Image!
  deleteImage(where: ImageWhereUniqueInput!): Image
  deleteManyImages(where: ImageWhereInput): BatchPayload!
  createRecArea(data: RecAreaCreateInput!): RecArea!
  updateRecArea(data: RecAreaUpdateInput!, where: RecAreaWhereUniqueInput!): RecArea
  updateManyRecAreas(data: RecAreaUpdateManyMutationInput!, where: RecAreaWhereInput): BatchPayload!
  upsertRecArea(where: RecAreaWhereUniqueInput!, create: RecAreaCreateInput!, update: RecAreaUpdateInput!): RecArea!
  deleteRecArea(where: RecAreaWhereUniqueInput!): RecArea
  deleteManyRecAreas(where: RecAreaWhereInput): BatchPayload!
  createReview(data: ReviewCreateInput!): Review!
  updateReview(data: ReviewUpdateInput!, where: ReviewWhereUniqueInput!): Review
  updateManyReviews(data: ReviewUpdateManyMutationInput!, where: ReviewWhereInput): BatchPayload!
  upsertReview(where: ReviewWhereUniqueInput!, create: ReviewCreateInput!, update: ReviewUpdateInput!): Review!
  deleteReview(where: ReviewWhereUniqueInput!): Review
  deleteManyReviews(where: ReviewWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

enum Permission {
  ADMIN
  USER
  IMAGECREATE
  IMAGEDELETE
  FAVORITECREATE
  FAVORITEDELETE
  RECAREACREATE
  RECAREAUPDATE
  RECAREADELETE
  REVIEWCREATE
  REVIEWUPDATE
  REVIEWDELETE
}

type Query {
  activity(where: ActivityWhereUniqueInput!): Activity
  activities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity]!
  activitiesConnection(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActivityConnection!
  favorite(where: FavoriteWhereUniqueInput!): Favorite
  favorites(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Favorite]!
  favoritesConnection(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FavoriteConnection!
  image(where: ImageWhereUniqueInput!): Image
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image]!
  imagesConnection(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ImageConnection!
  recArea(where: RecAreaWhereUniqueInput!): RecArea
  recAreas(where: RecAreaWhereInput, orderBy: RecAreaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [RecArea]!
  recAreasConnection(where: RecAreaWhereInput, orderBy: RecAreaOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RecAreaConnection!
  review(where: ReviewWhereUniqueInput!): Review
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review]!
  reviewsConnection(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReviewConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type RecArea {
  id: ID!
  activities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity!]
  description: String!
  directions: String
  favorites(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Favorite!]
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
}

type RecAreaConnection {
  pageInfo: PageInfo!
  edges: [RecAreaEdge]!
  aggregate: AggregateRecArea!
}

input RecAreaCreateInput {
  activities: ActivityCreateManyWithoutRecAreasInput
  description: String!
  directions: String
  favorites: FavoriteCreateManyWithoutRecAreaInput
  images: ImageCreateManyWithoutRecAreaInput
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
  reviews: ReviewCreateManyWithoutRecAreaInput
}

input RecAreaCreateOneWithoutActivitiesInput {
  create: RecAreaCreateWithoutActivitiesInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaCreateOneWithoutFavoritesInput {
  create: RecAreaCreateWithoutFavoritesInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaCreateOneWithoutImagesInput {
  create: RecAreaCreateWithoutImagesInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaCreateOneWithoutReviewsInput {
  create: RecAreaCreateWithoutReviewsInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaCreateWithoutActivitiesInput {
  description: String!
  directions: String
  favorites: FavoriteCreateManyWithoutRecAreaInput
  images: ImageCreateManyWithoutRecAreaInput
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
  reviews: ReviewCreateManyWithoutRecAreaInput
}

input RecAreaCreateWithoutFavoritesInput {
  activities: ActivityCreateManyWithoutRecAreasInput
  description: String!
  directions: String
  images: ImageCreateManyWithoutRecAreaInput
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
  reviews: ReviewCreateManyWithoutRecAreaInput
}

input RecAreaCreateWithoutImagesInput {
  activities: ActivityCreateManyWithoutRecAreasInput
  description: String!
  directions: String
  favorites: FavoriteCreateManyWithoutRecAreaInput
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
  reviews: ReviewCreateManyWithoutRecAreaInput
}

input RecAreaCreateWithoutReviewsInput {
  activities: ActivityCreateManyWithoutRecAreasInput
  description: String!
  directions: String
  favorites: FavoriteCreateManyWithoutRecAreaInput
  images: ImageCreateManyWithoutRecAreaInput
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
}

type RecAreaEdge {
  node: RecArea!
  cursor: String!
}

enum RecAreaOrderByInput {
  id_ASC
  id_DESC
  description_ASC
  description_DESC
  directions_ASC
  directions_DESC
  lat_ASC
  lat_DESC
  long_ASC
  long_DESC
  mapUrl_ASC
  mapUrl_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type RecAreaPreviousValues {
  id: ID!
  description: String!
  directions: String
  lat: Float!
  long: Float!
  mapUrl: String
  name: String!
}

type RecAreaSubscriptionPayload {
  mutation: MutationType!
  node: RecArea
  updatedFields: [String!]
  previousValues: RecAreaPreviousValues
}

input RecAreaSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: RecAreaWhereInput
  AND: [RecAreaSubscriptionWhereInput!]
  OR: [RecAreaSubscriptionWhereInput!]
  NOT: [RecAreaSubscriptionWhereInput!]
}

input RecAreaUpdateInput {
  activities: ActivityUpdateManyWithoutRecAreasInput
  description: String
  directions: String
  favorites: FavoriteUpdateManyWithoutRecAreaInput
  images: ImageUpdateManyWithoutRecAreaInput
  lat: Float
  long: Float
  mapUrl: String
  name: String
  reviews: ReviewUpdateManyWithoutRecAreaInput
}

input RecAreaUpdateManyMutationInput {
  description: String
  directions: String
  lat: Float
  long: Float
  mapUrl: String
  name: String
}

input RecAreaUpdateOneRequiredWithoutActivitiesInput {
  create: RecAreaCreateWithoutActivitiesInput
  update: RecAreaUpdateWithoutActivitiesDataInput
  upsert: RecAreaUpsertWithoutActivitiesInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaUpdateOneRequiredWithoutFavoritesInput {
  create: RecAreaCreateWithoutFavoritesInput
  update: RecAreaUpdateWithoutFavoritesDataInput
  upsert: RecAreaUpsertWithoutFavoritesInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaUpdateOneRequiredWithoutReviewsInput {
  create: RecAreaCreateWithoutReviewsInput
  update: RecAreaUpdateWithoutReviewsDataInput
  upsert: RecAreaUpsertWithoutReviewsInput
  connect: RecAreaWhereUniqueInput
}

input RecAreaUpdateOneWithoutImagesInput {
  create: RecAreaCreateWithoutImagesInput
  update: RecAreaUpdateWithoutImagesDataInput
  upsert: RecAreaUpsertWithoutImagesInput
  delete: Boolean
  disconnect: Boolean
  connect: RecAreaWhereUniqueInput
}

input RecAreaUpdateWithoutActivitiesDataInput {
  description: String
  directions: String
  favorites: FavoriteUpdateManyWithoutRecAreaInput
  images: ImageUpdateManyWithoutRecAreaInput
  lat: Float
  long: Float
  mapUrl: String
  name: String
  reviews: ReviewUpdateManyWithoutRecAreaInput
}

input RecAreaUpdateWithoutFavoritesDataInput {
  activities: ActivityUpdateManyWithoutRecAreasInput
  description: String
  directions: String
  images: ImageUpdateManyWithoutRecAreaInput
  lat: Float
  long: Float
  mapUrl: String
  name: String
  reviews: ReviewUpdateManyWithoutRecAreaInput
}

input RecAreaUpdateWithoutImagesDataInput {
  activities: ActivityUpdateManyWithoutRecAreasInput
  description: String
  directions: String
  favorites: FavoriteUpdateManyWithoutRecAreaInput
  lat: Float
  long: Float
  mapUrl: String
  name: String
  reviews: ReviewUpdateManyWithoutRecAreaInput
}

input RecAreaUpdateWithoutReviewsDataInput {
  activities: ActivityUpdateManyWithoutRecAreasInput
  description: String
  directions: String
  favorites: FavoriteUpdateManyWithoutRecAreaInput
  images: ImageUpdateManyWithoutRecAreaInput
  lat: Float
  long: Float
  mapUrl: String
  name: String
}

input RecAreaUpsertWithoutActivitiesInput {
  update: RecAreaUpdateWithoutActivitiesDataInput!
  create: RecAreaCreateWithoutActivitiesInput!
}

input RecAreaUpsertWithoutFavoritesInput {
  update: RecAreaUpdateWithoutFavoritesDataInput!
  create: RecAreaCreateWithoutFavoritesInput!
}

input RecAreaUpsertWithoutImagesInput {
  update: RecAreaUpdateWithoutImagesDataInput!
  create: RecAreaCreateWithoutImagesInput!
}

input RecAreaUpsertWithoutReviewsInput {
  update: RecAreaUpdateWithoutReviewsDataInput!
  create: RecAreaCreateWithoutReviewsInput!
}

input RecAreaWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  activities_every: ActivityWhereInput
  activities_some: ActivityWhereInput
  activities_none: ActivityWhereInput
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  directions: String
  directions_not: String
  directions_in: [String!]
  directions_not_in: [String!]
  directions_lt: String
  directions_lte: String
  directions_gt: String
  directions_gte: String
  directions_contains: String
  directions_not_contains: String
  directions_starts_with: String
  directions_not_starts_with: String
  directions_ends_with: String
  directions_not_ends_with: String
  favorites_every: FavoriteWhereInput
  favorites_some: FavoriteWhereInput
  favorites_none: FavoriteWhereInput
  images_every: ImageWhereInput
  images_some: ImageWhereInput
  images_none: ImageWhereInput
  lat: Float
  lat_not: Float
  lat_in: [Float!]
  lat_not_in: [Float!]
  lat_lt: Float
  lat_lte: Float
  lat_gt: Float
  lat_gte: Float
  long: Float
  long_not: Float
  long_in: [Float!]
  long_not_in: [Float!]
  long_lt: Float
  long_lte: Float
  long_gt: Float
  long_gte: Float
  mapUrl: String
  mapUrl_not: String
  mapUrl_in: [String!]
  mapUrl_not_in: [String!]
  mapUrl_lt: String
  mapUrl_lte: String
  mapUrl_gt: String
  mapUrl_gte: String
  mapUrl_contains: String
  mapUrl_not_contains: String
  mapUrl_starts_with: String
  mapUrl_not_starts_with: String
  mapUrl_ends_with: String
  mapUrl_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  AND: [RecAreaWhereInput!]
  OR: [RecAreaWhereInput!]
  NOT: [RecAreaWhereInput!]
}

input RecAreaWhereUniqueInput {
  id: ID
}

type Review {
  id: ID!
  content: String
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  rating: Int!
  recArea: RecArea!
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
}

type ReviewConnection {
  pageInfo: PageInfo!
  edges: [ReviewEdge]!
  aggregate: AggregateReview!
}

input ReviewCreateInput {
  content: String
  user: UserCreateOneWithoutReviewsInput!
  rating: Int!
  recArea: RecAreaCreateOneWithoutReviewsInput!
  images: ImageCreateManyWithoutReviewInput
}

input ReviewCreateManyWithoutRecAreaInput {
  create: [ReviewCreateWithoutRecAreaInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateOneWithoutImagesInput {
  create: ReviewCreateWithoutImagesInput
  connect: ReviewWhereUniqueInput
}

input ReviewCreateWithoutImagesInput {
  content: String
  user: UserCreateOneWithoutReviewsInput!
  rating: Int!
  recArea: RecAreaCreateOneWithoutReviewsInput!
}

input ReviewCreateWithoutRecAreaInput {
  content: String
  user: UserCreateOneWithoutReviewsInput!
  rating: Int!
  images: ImageCreateManyWithoutReviewInput
}

input ReviewCreateWithoutUserInput {
  content: String
  rating: Int!
  recArea: RecAreaCreateOneWithoutReviewsInput!
  images: ImageCreateManyWithoutReviewInput
}

type ReviewEdge {
  node: Review!
  cursor: String!
}

enum ReviewOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  rating_ASC
  rating_DESC
}

type ReviewPreviousValues {
  id: ID!
  content: String
  createdAt: DateTime!
  updatedAt: DateTime!
  rating: Int!
}

input ReviewScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  rating: Int
  rating_not: Int
  rating_in: [Int!]
  rating_not_in: [Int!]
  rating_lt: Int
  rating_lte: Int
  rating_gt: Int
  rating_gte: Int
  AND: [ReviewScalarWhereInput!]
  OR: [ReviewScalarWhereInput!]
  NOT: [ReviewScalarWhereInput!]
}

type ReviewSubscriptionPayload {
  mutation: MutationType!
  node: Review
  updatedFields: [String!]
  previousValues: ReviewPreviousValues
}

input ReviewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReviewWhereInput
  AND: [ReviewSubscriptionWhereInput!]
  OR: [ReviewSubscriptionWhereInput!]
  NOT: [ReviewSubscriptionWhereInput!]
}

input ReviewUpdateInput {
  content: String
  user: UserUpdateOneRequiredWithoutReviewsInput
  rating: Int
  recArea: RecAreaUpdateOneRequiredWithoutReviewsInput
  images: ImageUpdateManyWithoutReviewInput
}

input ReviewUpdateManyDataInput {
  content: String
  rating: Int
}

input ReviewUpdateManyMutationInput {
  content: String
  rating: Int
}

input ReviewUpdateManyWithoutRecAreaInput {
  create: [ReviewCreateWithoutRecAreaInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutRecAreaInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutRecAreaInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithWhereNestedInput {
  where: ReviewScalarWhereInput!
  data: ReviewUpdateManyDataInput!
}

input ReviewUpdateOneWithoutImagesInput {
  create: ReviewCreateWithoutImagesInput
  update: ReviewUpdateWithoutImagesDataInput
  upsert: ReviewUpsertWithoutImagesInput
  delete: Boolean
  disconnect: Boolean
  connect: ReviewWhereUniqueInput
}

input ReviewUpdateWithoutImagesDataInput {
  content: String
  user: UserUpdateOneRequiredWithoutReviewsInput
  rating: Int
  recArea: RecAreaUpdateOneRequiredWithoutReviewsInput
}

input ReviewUpdateWithoutRecAreaDataInput {
  content: String
  user: UserUpdateOneRequiredWithoutReviewsInput
  rating: Int
  images: ImageUpdateManyWithoutReviewInput
}

input ReviewUpdateWithoutUserDataInput {
  content: String
  rating: Int
  recArea: RecAreaUpdateOneRequiredWithoutReviewsInput
  images: ImageUpdateManyWithoutReviewInput
}

input ReviewUpdateWithWhereUniqueWithoutRecAreaInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutRecAreaDataInput!
}

input ReviewUpdateWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutUserDataInput!
}

input ReviewUpsertWithoutImagesInput {
  update: ReviewUpdateWithoutImagesDataInput!
  create: ReviewCreateWithoutImagesInput!
}

input ReviewUpsertWithWhereUniqueWithoutRecAreaInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutRecAreaDataInput!
  create: ReviewCreateWithoutRecAreaInput!
}

input ReviewUpsertWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutUserDataInput!
  create: ReviewCreateWithoutUserInput!
}

input ReviewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  rating: Int
  rating_not: Int
  rating_in: [Int!]
  rating_not_in: [Int!]
  rating_lt: Int
  rating_lte: Int
  rating_gt: Int
  rating_gte: Int
  recArea: RecAreaWhereInput
  images_every: ImageWhereInput
  images_some: ImageWhereInput
  images_none: ImageWhereInput
  AND: [ReviewWhereInput!]
  OR: [ReviewWhereInput!]
  NOT: [ReviewWhereInput!]
}

input ReviewWhereUniqueInput {
  id: ID
}

type Subscription {
  activity(where: ActivitySubscriptionWhereInput): ActivitySubscriptionPayload
  favorite(where: FavoriteSubscriptionWhereInput): FavoriteSubscriptionPayload
  image(where: ImageSubscriptionWhereInput): ImageSubscriptionPayload
  recArea(where: RecAreaSubscriptionWhereInput): RecAreaSubscriptionPayload
  review(where: ReviewSubscriptionWhereInput): ReviewSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  emailValidated: Boolean!
  validateEmailToken: String!
  favorites(where: FavoriteWhereInput, orderBy: FavoriteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Favorite!]
  images(where: ImageWhereInput, orderBy: ImageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Image!]
  name: String!
  password: String!
  permissions: [Permission!]!
  resetToken: String!
  resetTokenExpiry: Float
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String!
  emailValidated: Boolean
  validateEmailToken: String!
  favorites: FavoriteCreateManyWithoutUserInput
  images: ImageCreateManyWithoutUserInput
  name: String!
  password: String!
  permissions: UserCreatepermissionsInput
  resetToken: String!
  resetTokenExpiry: Float
  reviews: ReviewCreateManyWithoutUserInput
}

input UserCreateOneWithoutFavoritesInput {
  create: UserCreateWithoutFavoritesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  connect: UserWhereUniqueInput
}

input UserCreatepermissionsInput {
  set: [Permission!]
}

input UserCreateWithoutFavoritesInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String!
  emailValidated: Boolean
  validateEmailToken: String!
  images: ImageCreateManyWithoutUserInput
  name: String!
  password: String!
  permissions: UserCreatepermissionsInput
  resetToken: String!
  resetTokenExpiry: Float
  reviews: ReviewCreateManyWithoutUserInput
}

input UserCreateWithoutImagesInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String!
  emailValidated: Boolean
  validateEmailToken: String!
  favorites: FavoriteCreateManyWithoutUserInput
  name: String!
  password: String!
  permissions: UserCreatepermissionsInput
  resetToken: String!
  resetTokenExpiry: Float
  reviews: ReviewCreateManyWithoutUserInput
}

input UserCreateWithoutReviewsInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String!
  emailValidated: Boolean
  validateEmailToken: String!
  favorites: FavoriteCreateManyWithoutUserInput
  images: ImageCreateManyWithoutUserInput
  name: String!
  password: String!
  permissions: UserCreatepermissionsInput
  resetToken: String!
  resetTokenExpiry: Float
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  avatar_ASC
  avatar_DESC
  facebookId_ASC
  facebookId_DESC
  googleId_ASC
  googleId_DESC
  twitterId_ASC
  twitterId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  emailValidated_ASC
  emailValidated_DESC
  validateEmailToken_ASC
  validateEmailToken_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  resetToken_ASC
  resetToken_DESC
  resetTokenExpiry_ASC
  resetTokenExpiry_DESC
}

type UserPreviousValues {
  id: ID!
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  emailValidated: Boolean!
  validateEmailToken: String!
  name: String!
  password: String!
  permissions: [Permission!]!
  resetToken: String!
  resetTokenExpiry: Float
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  emailValidated: Boolean
  validateEmailToken: String
  favorites: FavoriteUpdateManyWithoutUserInput
  images: ImageUpdateManyWithoutUserInput
  name: String
  password: String
  permissions: UserUpdatepermissionsInput
  resetToken: String
  resetTokenExpiry: Float
  reviews: ReviewUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  emailValidated: Boolean
  validateEmailToken: String
  name: String
  password: String
  permissions: UserUpdatepermissionsInput
  resetToken: String
  resetTokenExpiry: Float
}

input UserUpdateOneRequiredWithoutFavoritesInput {
  create: UserCreateWithoutFavoritesInput
  update: UserUpdateWithoutFavoritesDataInput
  upsert: UserUpsertWithoutFavoritesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutImagesInput {
  create: UserCreateWithoutImagesInput
  update: UserUpdateWithoutImagesDataInput
  upsert: UserUpsertWithoutImagesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  update: UserUpdateWithoutReviewsDataInput
  upsert: UserUpsertWithoutReviewsInput
  connect: UserWhereUniqueInput
}

input UserUpdatepermissionsInput {
  set: [Permission!]
}

input UserUpdateWithoutFavoritesDataInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  emailValidated: Boolean
  validateEmailToken: String
  images: ImageUpdateManyWithoutUserInput
  name: String
  password: String
  permissions: UserUpdatepermissionsInput
  resetToken: String
  resetTokenExpiry: Float
  reviews: ReviewUpdateManyWithoutUserInput
}

input UserUpdateWithoutImagesDataInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  emailValidated: Boolean
  validateEmailToken: String
  favorites: FavoriteUpdateManyWithoutUserInput
  name: String
  password: String
  permissions: UserUpdatepermissionsInput
  resetToken: String
  resetTokenExpiry: Float
  reviews: ReviewUpdateManyWithoutUserInput
}

input UserUpdateWithoutReviewsDataInput {
  avatar: String
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  emailValidated: Boolean
  validateEmailToken: String
  favorites: FavoriteUpdateManyWithoutUserInput
  images: ImageUpdateManyWithoutUserInput
  name: String
  password: String
  permissions: UserUpdatepermissionsInput
  resetToken: String
  resetTokenExpiry: Float
}

input UserUpsertWithoutFavoritesInput {
  update: UserUpdateWithoutFavoritesDataInput!
  create: UserCreateWithoutFavoritesInput!
}

input UserUpsertWithoutImagesInput {
  update: UserUpdateWithoutImagesDataInput!
  create: UserCreateWithoutImagesInput!
}

input UserUpsertWithoutReviewsInput {
  update: UserUpdateWithoutReviewsDataInput!
  create: UserCreateWithoutReviewsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  facebookId: String
  facebookId_not: String
  facebookId_in: [String!]
  facebookId_not_in: [String!]
  facebookId_lt: String
  facebookId_lte: String
  facebookId_gt: String
  facebookId_gte: String
  facebookId_contains: String
  facebookId_not_contains: String
  facebookId_starts_with: String
  facebookId_not_starts_with: String
  facebookId_ends_with: String
  facebookId_not_ends_with: String
  googleId: String
  googleId_not: String
  googleId_in: [String!]
  googleId_not_in: [String!]
  googleId_lt: String
  googleId_lte: String
  googleId_gt: String
  googleId_gte: String
  googleId_contains: String
  googleId_not_contains: String
  googleId_starts_with: String
  googleId_not_starts_with: String
  googleId_ends_with: String
  googleId_not_ends_with: String
  twitterId: String
  twitterId_not: String
  twitterId_in: [String!]
  twitterId_not_in: [String!]
  twitterId_lt: String
  twitterId_lte: String
  twitterId_gt: String
  twitterId_gte: String
  twitterId_contains: String
  twitterId_not_contains: String
  twitterId_starts_with: String
  twitterId_not_starts_with: String
  twitterId_ends_with: String
  twitterId_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  emailValidated: Boolean
  emailValidated_not: Boolean
  validateEmailToken: String
  validateEmailToken_not: String
  validateEmailToken_in: [String!]
  validateEmailToken_not_in: [String!]
  validateEmailToken_lt: String
  validateEmailToken_lte: String
  validateEmailToken_gt: String
  validateEmailToken_gte: String
  validateEmailToken_contains: String
  validateEmailToken_not_contains: String
  validateEmailToken_starts_with: String
  validateEmailToken_not_starts_with: String
  validateEmailToken_ends_with: String
  validateEmailToken_not_ends_with: String
  favorites_every: FavoriteWhereInput
  favorites_some: FavoriteWhereInput
  favorites_none: FavoriteWhereInput
  images_every: ImageWhereInput
  images_some: ImageWhereInput
  images_none: ImageWhereInput
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  resetToken: String
  resetToken_not: String
  resetToken_in: [String!]
  resetToken_not_in: [String!]
  resetToken_lt: String
  resetToken_lte: String
  resetToken_gt: String
  resetToken_gte: String
  resetToken_contains: String
  resetToken_not_contains: String
  resetToken_starts_with: String
  resetToken_not_starts_with: String
  resetToken_ends_with: String
  resetToken_not_ends_with: String
  resetTokenExpiry: Float
  resetTokenExpiry_not: Float
  resetTokenExpiry_in: [Float!]
  resetTokenExpiry_not_in: [Float!]
  resetTokenExpiry_lt: Float
  resetTokenExpiry_lte: Float
  resetTokenExpiry_gt: Float
  resetTokenExpiry_gte: Float
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  facebookId: String
  googleId: String
  twitterId: String
  email: String
  validateEmailToken: String
  resetToken: String
}
`
      }
    