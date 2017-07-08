# syty-auction

3 views
	- summary
		show dashboard
			each cell contains max bid and max bidders
		show notification sidebar

	- personal
		show login if dont see auth cookies
		otherwise, show dashboard
			if you're leading
			if not, next min bid
				click -> open form to bid
				bidder info is taken from cookies

	- admin
		show form to bid with name fields

API
	- login
		submit form of first name, last name, company, table
		server set cookies in response: either
			- token (persistence)
			- above info again

	- logout
		clear cookies

	- nuke
		clear all bidding data

	- bid
		submit form of slot number and bid amt, with auth cookies

	- admin bid
		submit form of slot number and bid amt, with first name, last name, company(opt), table		

	- dashboard snapshot/update
		{
			[{
				slot
				bid
				bidders[{
					first name
					table
				}]
			}]
		}
		{
			[{
				first name
				table
				bid
				slot
			}]
		}