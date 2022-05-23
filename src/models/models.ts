import { Key } from "react"

export type  Contact = {
    id: Key,
    firstName: String,
    lastName: String,
    date?: Date,
    contactType: String,
    contactNumber: String
}