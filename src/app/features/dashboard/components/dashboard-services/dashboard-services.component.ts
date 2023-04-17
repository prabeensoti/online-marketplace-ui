import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-services',
  templateUrl: './dashboard-services.component.html',
  styleUrls: ['./dashboard-services.component.scss']
})
export class DashboardServicesComponent implements OnInit {

  // services according to user group - customer, vendor, admin or client
  services = [
    { name: 'Your Account', description: 'View and manage your account information and settings' },
    { name: 'Your Orders', description: 'Track, return, cancel an order, download invoice or buy again' },
    { name: 'Login & security', description: 'Edit login, name, and mobile number' },
    { name: 'Prime', description: 'Manage your membership, view benefits, and payment settings' },
    { name: 'Your addresses', description: 'Edit, remove or set default address' },
    { name: 'Gift cards', description: 'View balance or redeem a card, and purchase a new Gift Card' },
    { name: 'Your Payments', description: 'View all transactions, manage payment methods and settings' },
    { name: 'Your Profiles', description: 'Manage, add, or remove user profiles for personalized experiences' },
    { name: 'Digital Services and Device Support', description: 'Troubleshoot device issues, manage or cancel digital subscriptions' },
    { name: 'Your Messages', description: 'View or respond to messages from Amazon, Sellers and Buyers' },
    { name: 'Archived orders', description: 'View and manage your archived orders' },
    { name: 'Your Lists', description: 'View, modify, and share your lists, or create new ones' },
    { name: 'Customer Service', description: 'Browse self service options, help articles or contact us' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
