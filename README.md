# To Do

Issues:

😀1.  When testing with client, a dealer account (in cognito) did not see the dealer tab. It would not come up. We tried a few times and it didn't work. Now it works but see what we can do about that.
2.  Create dealer page, on the second page,only ask for one field which is theirProfitMarginPercent. We need that number for the transactions markup. Hide everything else.
😀3.  On create dealership page, email should be auto filled in / connected to the account that is currently logged in.
😀4.  If they click dealer again, they should see the dealership they just created with their account. Not the form again.
😀5.  Dashboard sometimes doesn't load on first try because I think it needs a loader or as error loading. I see an error "cannot read properties of undefined, reading salespeople" so I think that if salespeople array is null, it gives issue
6.  Customers should only be shown to the dealership they are registered too. No one else.
😀7.  On dashboard page, I don't see current dealership that you are tied to. It just says Dealership in the title
😀8.  No back buttons on pages.
😀9.  new accounts going to dashboard see the customer list. They should not see it. Customer list should be private and based upon the dealership you are tied to. Make sure that customer list is hidden and only available if the management or salesperson account is registered to that dealership
10. We also see transactions. We shouldn't see any transactions becasue those are from different dealerships. Make sure you filter the UI based on dealership so that other dealerships don't see the wrong info.
😀11. VIN number on create transaction only takes numbers. It needs to take letters too. abc123adsfa for example.
12. On transaction page, the dealer markup object is the only thing to be shown on the second page. It needs to come from the Dealership.theirProfitMarginPercent object. A salesperson can change the number though.
😀13. I have trouble seeing transactions load sometimes. I think salespersonID is loading too fast

    New notes:
    Error handling wrong password

Change password page?

😀We have to wait a moment in home page while it fetches. Maybe add a 3 second loader on the home page for the data fetch

😀On invoice page, you should see past invoices there too, and then see option to create a new one?

Is this done? -- For example, change recent deposits number to "Total sales" and add up all salesmen and all transacations and put that number there.

😀Dealer button dissapeared for management. it is not always in nav

- NOT IMPORTANT -eeror message when signing in if email already used or just do error handling
  Daniel:

- For recent customers, maybe apply filter or search bar, or put most recent first. NOT IMPORTANT

extra info:

😀- We might not need a dealerUserId for the actual dealer account. Just have a check on the email under the dealer database schema. If that email matches the ligUserEmail, then that is a dealer account.

😀Why is the email tied to the salesperson or dealership ID, figure that out?

😀If logged in user is "mgmt" and aalready verdefy approved, make sure that the MGMT button comes up on the header. When creating a new account, you have to go to create dealership to create a dealership tied to this account. Make sure this works

- Invoicing to Dealers (how company makes money) can be done later. but the invoice PDF generation will copy the other one we made before and be very close

😀- Get rid of weird growing hovering words thing when hovering over something

😀- change vite browser tab icon to verdefy logo
😀- get rid of the growing verdeyf footer thing. Just have it regular and not growing

# Bugs:

- On signup page, when creating a user, if password does not fit policy (aka not long enough) the form will reset but no error will be present.

# Documentation

Auth

- Make regular account and then in AWS switch to admin. By default, all new accounts will be sales.
- Use admin account to make dealer as well

- deal with dealership ID delimmea. Do we need it? Can we make it shorter / easier like a code? Maybe the first 6 of the sub
- For salespeople, we need to link userId to the salesperson database. We make salespeople accounts by default when you sign up. Maybe change it so that only mgmt or admins can make a salespersons account? No that is too burdensome on mgmt. They just need the code

## Data

- Logged in user ID == sub
