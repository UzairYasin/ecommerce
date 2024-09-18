import {
    boolean,
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    numeric,
    varchar,
  } from "drizzle-orm/pg-core"
  import postgres from "postgres"
  import { drizzle } from "drizzle-orm/postgres-js"
  import type { AdapterAccountType } from "next-auth/adapters"
import { relations } from "drizzle-orm"
   
  const connectionString = process.env.POSTGRES_URL!
  const pool = postgres(connectionString, { max: 1 })
   
  export const db = drizzle(pool)
   
  export const users = pgTable("user", {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    role: text("role").default("user").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    isVerified: boolean('is_verified').default(false),
    image: text("image"),
    password: text("password"),
  })
   
  export const accounts = pgTable(
    "account",
    {
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").$type<AdapterAccountType>().notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: integer("expires_at"),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
    },
    (account) => ({
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    })
  )
   
  export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })
   
  export const verificationTokens = pgTable(
    "verificationToken",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
      compositePk: primaryKey({
        columns: [verificationToken.identifier, verificationToken.token],
      }),
    })
  )
   
  export const authenticators = pgTable(
    "authenticator",
    {
      credentialID: text("credentialID").notNull().unique(),
      userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      providerAccountId: text("providerAccountId").notNull(),
      credentialPublicKey: text("credentialPublicKey").notNull(),
      counter: integer("counter").notNull(),
      credentialDeviceType: text("credentialDeviceType").notNull(),
      credentialBackedUp: boolean("credentialBackedUp").notNull(),
      transports: text("transports"),
    },
    (authenticator) => ({
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    })
  )

  export const VerificationToken = pgTable(
    'email_verification',{
      id: serial('v_id').primaryKey(),
      email: text('email').unique().notNull(),
      token: text('token').unique().notNull(),
      expires: timestamp('expires', {withTimezone:false}).notNull().defaultNow() 
    }
  )

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  customerAddress: text('customer_address').notNull(),
  shipping_status:varchar('shipping_status', { length: 50 }).default("unshipped"),// e.g., shipped, unshipped 
  payment_status: varchar('payment_status', { length: 50 }).notNull(), // e.g., pending, completed, canceled
  payment_type: varchar('payment_type', { length: 50 }), // e.g., card, bank transfer
  payment_brand: varchar('payment_brand', { length: 50 }), // e.g., visa, master, etc
  tax: numeric('tax', { precision: 10, scale: 2 }).default('0'),
  shipping: numeric('shipping', { precision: 10, scale: 2 }).default('0'),
  tracking_id: varchar('tracking_id', {length: 255}),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(), // e.g., USD, EUR
  cardLast4: varchar('card_last_4', { length: 4 }).notNull(), // Last 4 digits of card number
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Order Items table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id), // Foreign key to orders table
  name: varchar('name', { length: 255 }).notNull(), // Product name
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // Product price
  quantity: integer('quantity').notNull(), // Quantity ordered
});

// Define the relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  orderItems: many(orderItems), // One order has many order items
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }), // Each order item belongs to one order
}));