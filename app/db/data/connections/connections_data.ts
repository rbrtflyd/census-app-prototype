import { ConnectionServiceType } from '../../types';

const connectionsData: ConnectionServiceType[] = [
  // B2B SaaS Apps
  {
    id: 1,
    connectionServiceName: 'Salesforce',
    connectionServiceType: 'CRM',
    connectionServiceCategory: 'business_app',
    description:
      'A leading customer relationship management platform. It offers a suite of tools for sales, service, marketing, and analytics.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
    modes: ['both'],
    authentication_methods: ['OAuth', 'Credentials'],
    credentials: [
      {
        authentication_method: 'Credentials',
        section: 'Credentials',
        field_name: 'Username',
        field_type: 'text',
        field_description: 'The username for the Salesforce account.',
        field_required: true,
      },
      {
        authentication_method: 'Credentials',
        section: 'Credentials',
        field_name: 'Password',
        field_type: 'password',
        field_description: 'The password for the Salesforce account.',
        field_required: true,
      },
      {
        authentication_method: 'OAuth',
        section: 'OAuth',
      },
    ],
  },
  {
    id: 2,
    connectionServiceName: 'HubSpot',
    connectionServiceType: 'CRM',
    connectionServiceCategory: 'business_app',
    description:
      'An inbound marketing and sales platform. It provides tools for content management, web analytics, and social media marketing.',
    logo: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg',
    modes: ['both'],
    authentication_methods: ['OAuth', 'Domain'],
    credentials: [
      {
        field_name: 'API Key',
        field_type: 'text',
        field_description: 'The API key for the SendGrid account.',
        field_required: true,
      },
    ],
  },
  {
    id: 3,
    connectionServiceName: 'Zendesk',
    connectionServiceType: 'Customer Support',
    connectionServiceCategory: 'business_app',
    description:
      'A customer service software and support ticket system. It helps businesses provide seamless customer support across multiple channels.',
    logo: 'https://cdn.worldvectorlogo.com/logos/zendesk-3.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials', 'Domain'],
    credentials: [
      {
        field_name: 'API Key',
        field_type: 'text',
        field_description: 'The API key for the SendGrid account.',
        field_required: true,
      },
    ],
  },
  {
    id: 4,
    connectionServiceName: 'Slack',
    connectionServiceType: 'Communication',
    connectionServiceCategory: 'business_app',
    description:
      'A business communication platform offering many IRC-style features. It facilitates team collaboration through channels, direct messaging, and file sharing.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth'],
  },
  {
    id: 5,
    connectionServiceName: 'Jira',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
    description: `An issue tracking and project management tool. It's widely used for software development to plan, track, and manage agile projects.`,
    logo: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials', 'Domain'],
  },
  {
    id: 6,
    connectionServiceName: 'Asana',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
    description:
      'A web and mobile application designed to help teams organize, track, and manage their work. It offers features for task management, team collaboration, and workflow planning.',
    logo: 'https://cdn.worldvectorlogo.com/logos/asana-logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 7,
    connectionServiceName: 'Intercom',
    connectionServiceType: 'Customer Engagement',
    connectionServiceCategory: 'business_app',
    description:
      'A customer messaging platform that allows businesses to communicate with prospective and existing customers. It offers tools for live chat, marketing automation, and customer support.',
    logo: 'https://cdn.worldvectorlogo.com/logos/intercom-2.svg',
    authentication_methods: ['OAuth', 'Credentials'],
  },

  // Data Warehouses
  {
    id: 8,
    connectionServiceName: 'Snowflake',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A cloud-based data warehousing platform. It offers scalable storage and compute resources for data analytics and big data processing.',
    logo: '/logos/connections/snowflake-logo.svg',
    modes: ['both'],
    authentication_methods: [
      'OAuth',
      'Credentials',
      'Role',
      'Snowflake Partner Connect',
    ],
    credentials: [
      {
        authentication_method: 'Snowflake Partner Connect',
        field_name: 'Snowflake Partner Connect',
        field_type: 'text',
        field_description: 'The Snowflake Partner Connect token.',
        field_required: true,
      },
      {
        authentication_method: 'Credentials',
        field_name: 'Username',
        field_type: 'text',
        field_description: 'The username for the Snowflake account.',
        field_required: true,
      },
    ],
  },
  {
    id: 9,
    connectionServiceName: 'Google BigQuery',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description: `A fully-managed, serverless data warehouse that enables super-fast SQL queries. It's designed to analyze large datasets efficiently.`,
    logo: 'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',
    modes: ['both'],
    authentication_methods: ['Generate Service Key', 'BigQuery Service Key'],
    credentials: [
      {
        authentication_method: 'Generate Service Key',
        field_name: 'Project ID',
        field_type: 'text',
        field_description: 'The BigQuery project ID for the account.',
        field_required: true,
      },
      {
        authentication_method: 'Generate Service Key',
        field_name: 'Location',
        field_type: 'select',
        field_description: 'The BigQuery location for the account.',
        field_required: true,
      },
      {
        authentication_method: 'BigQuery Service Key',
        field_name: 'Service Account Key JSON',
        field_type: 'text',
        field_description:
          'The service account key JSON for the BigQuery account.',
        field_required: true,
      },
    ],
  },
  {
    id: 10,
    connectionServiceName: 'Amazon Redshift',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A fully managed, petabyte-scale data warehouse service in the cloud. It allows you to analyze large volumes of data using your existing business intelligence tools.',
    logo: 'https://cdn.worldvectorlogo.com/logos/aws-redshift-logo.svg',
    modes: ['both'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 11,
    connectionServiceName: 'Azure Synapse Analytics',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'An analytics service that brings together enterprise data warehousing and big data analytics. It gives you the freedom to query data on your terms, using either serverless or dedicated resources.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
    modes: ['both'],
    authentication_methods: ['OAuth', 'Credentials', 'Role'],
  },
  {
    id: 12,
    connectionServiceName: 'Databricks',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A unified analytics platform for big data processing and machine learning. It provides a collaborative environment for data scientists, data engineers, and business analysts.',
    logo: 'https://cdn.brandfetch.io/idSUrLOWbH/theme/dark/symbol.svg?k=bfHSJFAPEG',
    modes: ['both'],
    authentication_methods: ['OAuth', 'Domain', 'Role'],
  },

  // Social Media Ads Destinations
  {
    id: 13,
    connectionServiceName: 'Facebook Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An online advertising platform offered by Facebook. It allows businesses to create and run ads across Facebook, Instagram, Messenger, and the Audience Network.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
    modes: ['destination'],
    authentication_methods: ['OAuth'],
  },
  {
    id: 14,
    connectionServiceName: 'Google Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An online advertising platform developed by Google. It allows advertisers to display brief advertisements, service offerings, product listings, and video content within the Google ad network.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 15,
    connectionServiceName: 'LinkedIn Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'A marketing solution for businesses to advertise on LinkedIn. It offers various ad formats and targeting options to reach professionals and businesses.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
    modes: ['destination'],
    authentication_methods: ['OAuth'],
  },
  {
    id: 16,
    connectionServiceName: 'Twitter Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for promoting tweets and accounts on Twitter. It allows businesses to reach a wider audience and engage with potential customers.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 17,
    connectionServiceName: 'TikTok Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for the popular short-form video app TikTok. It enables businesses to create engaging video ads and reach a younger demographic.',
    logo: 'https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth'],
  },
  {
    id: 18,
    connectionServiceName: 'Pinterest Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for businesses to promote their products and services on Pinterest. It offers various ad formats like promoted pins and shopping ads.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 19,
    connectionServiceName: 'Snapchat Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for the multimedia messaging app Snapchat. It allows businesses to create interactive and engaging ads for a predominantly young audience.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/1024px-Snapchat_logo.svg.png',
    modes: ['destination'],
    authentication_methods: ['OAuth'],
  },
  // Event Streaming Platforms
  {
    id: 20,
    connectionServiceName: 'Apache Kafka',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description: `An open-source distributed event streaming platform. It's capable of handling trillions of events a day and is used for building real-time data pipelines and streaming apps.`,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Apache_kafka.svg',
    modes: ['destination'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 21,
    connectionServiceName: 'Amazon Kinesis',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A platform for streaming data on AWS, making it easy to collect, process, and analyze real-time, streaming data. It can handle any amount of data from hundreds of thousands of sources.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/AmazonWebservices_Logo.svg',
    modes: ['destination'],
    authentication_methods: ['Credentials', 'Role'],
  },
  {
    id: 22,
    connectionServiceName: 'Google Cloud Pub/Sub',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A fully-managed real-time messaging service that allows you to send and receive messages between independent applications. It provides reliable, many-to-many, asynchronous messaging.',
    logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-pub-sub-logo.svg',
    authentication_methods: ['OAuth', 'Role', 'Domain'],
  },
  {
    id: 23,
    connectionServiceName: 'Azure Event Hubs',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A big data streaming platform and event ingestion service. It can receive and process millions of events per second and is designed to build scalable big data pipelines.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials', 'Role'],
  },
  {
    id: 24,
    connectionServiceName: 'RabbitMQ',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description: `An open-source message broker that supports multiple messaging protocols. It's lightweight and easy to deploy on premises and in the cloud.`,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg',
    modes: ['destination'],
    authentication_methods: ['Credentials', 'Domain'],
  },
  // App Database Services
  {
    id: 26,
    connectionServiceName: 'MongoDB',
    connectionServiceType: 'NoSQL Database',
    connectionServiceCategory: 'database',
    description:
      'A popular document-oriented NoSQL database. It offers high performance, high availability, and easy scalability for modern applications.',
    logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 27,
    connectionServiceName: 'PostgreSQL',
    connectionServiceType: 'Relational Database',
    connectionServiceCategory: 'database',
    description:
      'A powerful, open-source object-relational database system. It has a strong reputation for reliability, feature robustness, and performance.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role'],
  },
  {
    id: 28,
    connectionServiceName: 'MySQL',
    connectionServiceType: 'Relational Database',
    connectionServiceCategory: 'database',
    description:
      'An open-source relational database management system. It is widely used for web applications and is known for its speed, reliability, and ease of use.',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 29,
    connectionServiceName: 'Redis',
    connectionServiceType: 'In-Memory Database',
    connectionServiceCategory: 'database',
    description:
      'An open-source, in-memory data structure store, used as a database, cache, and message broker. It supports various data structures and is known for its high performance.',
    logo: 'https://cdn.worldvectorlogo.com/logos/redis.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role'],
  },
  {
    id: 30,
    connectionServiceName: 'Cassandra',
    connectionServiceType: 'NoSQL Database',
    connectionServiceCategory: 'database',
    description:
      'A highly scalable, distributed NoSQL database designed to handle large amounts of structured data across many commodity servers.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 31,
    connectionServiceName: 'NetSuite',
    connectionServiceType: 'ERP',
    connectionServiceCategory: 'business_app',
    description:
      'A cloud-based business management suite that includes ERP, financials, CRM, and ecommerce capabilities.',
    logo: 'https://cdn.worldvectorlogo.com/logos/netsuite.svg',
    modes: ['source'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 32,
    connectionServiceName: 'Workday',
    connectionServiceType: 'HCM',
    connectionServiceCategory: 'business_app',
    description:
      'A cloud-based system for human capital management, financial management, and planning.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Workday_Logo.svg',
    modes: ['source'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 33,
    connectionServiceName: 'Adobe Analytics',
    connectionServiceType: 'Analytics',
    connectionServiceCategory: 'business_app',
    description:
      'A web analytics and marketing analytics platform that provides real-time analytics and detailed segmentation.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Analytics_logo.svg',
    modes: ['source'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 34,
    connectionServiceName: 'Oracle',
    connectionServiceType: 'Database',
    connectionServiceCategory: 'database',
    description:
      'A multi-model database management system. It provides a comprehensive and fully integrated stack of cloud applications and platform services.',
    logo: 'https://cdn.worldvectorlogo.com/logos/oracle-corporation-logo.svg',
    modes: ['source'],
    authentication_methods: ['Credentials', 'Role', 'Domain'],
  },
  {
    id: 35,
    connectionServiceName: 'SAP',
    connectionServiceType: 'ERP',
    connectionServiceCategory: 'business_app',
    description:
      'An enterprise resource planning software package for large enterprises and mid-size companies. It includes modules for various business processes.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials', 'Domain'],
  },
  {
    id: 36,
    connectionServiceName: 'Stripe',
    connectionServiceType: 'Payment Processing',
    connectionServiceCategory: 'business_app',
    description:
      'A technology company that builds economic infrastructure for the internet. It provides payment processing software and APIs for e-commerce websites and mobile applications.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 37,
    connectionServiceName: 'Segment',
    connectionServiceType: 'Customer Data Platform',
    connectionServiceCategory: 'business_app',
    description:
      'A customer data platform that helps businesses collect, clean, and control their customer data.',
    logo: 'https://cdn.worldvectorlogo.com/logos/segment-logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 38,
    connectionServiceName: 'Mixpanel',
    connectionServiceType: 'Analytics',
    connectionServiceCategory: 'business_app',
    description:
      'A business analytics service company that tracks user interactions with web and mobile applications.',
    logo: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 39,
    connectionServiceName: 'Amplitude',
    connectionServiceType: 'Analytics',
    connectionServiceCategory: 'business_app',
    description:
      'A product analytics platform that helps companies build better products through data-driven decisions.',
    logo: 'https://cdn.worldvectorlogo.com/logos/amplitude-logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 41,
    connectionServiceName: 'Tableau',
    connectionServiceType: 'Business Intelligence',
    connectionServiceCategory: 'business_app',
    description:
      'A visual analytics platform that helps people see and understand data.',
    logo: 'https://cdn.worldvectorlogo.com/logos/tableau-software.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 42,
    connectionServiceName: 'Marketo',
    connectionServiceType: 'Marketing Automation',
    connectionServiceCategory: 'business_app',
    description:
      'A software platform for marketing automation and revenue generation that helps marketers master the art and science of digital marketing.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Marketo_Logo.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 43,
    connectionServiceName: 'Klaviyo',
    connectionServiceType: 'Marketing Automation',
    connectionServiceCategory: 'business_app',
    description:
      'A marketing automation platform for e-commerce businesses that provides email marketing and SMS marketing solutions.',
    logo: 'https://cdn.worldvectorlogo.com/logos/klaviyo-1.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 44,
    connectionServiceName: 'Braze',
    connectionServiceType: 'Customer Engagement',
    connectionServiceCategory: 'business_app',
    description:
      'A customer engagement platform that delivers messaging experiences across push, email, apps, and more.',
    logo: 'https://cdn.worldvectorlogo.com/logos/braze-1.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 45,
    connectionServiceName: 'Twilio',
    connectionServiceType: 'Communications',
    connectionServiceCategory: 'business_app',
    description:
      'A cloud communications platform that enables phone calls, text messages, and other communication functions to be embedded into web and mobile applications.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 46,
    connectionServiceName: 'SendGrid',
    connectionServiceType: 'Email Service',
    connectionServiceCategory: 'business_app',
    description:
      'A cloud-based email delivery platform that assists businesses with email delivery and management.',
    logo: 'https://cdn.worldvectorlogo.com/logos/sendgrid-1.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
    credentials: [
      {
        field_name: 'API Key',
        field_type: 'text',
        field_description: 'The API key for the SendGrid account.',
        field_required: true,
      },
    ],
  },
  {
    id: 47,
    connectionServiceName: 'Mailchimp',
    connectionServiceType: 'Email Marketing',
    connectionServiceCategory: 'business_app',
    description:
      'An all-in-one marketing platform that helps manage and talk to clients, customers, and other interested parties.',
    logo: 'https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon-2.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Credentials'],
  },
  {
    id: 48,
    connectionServiceName: 'Shopify',
    connectionServiceType: 'E-commerce',
    connectionServiceCategory: 'business_app',
    description:
      'A complete commerce platform that lets you start, grow, and manage a business with online store capabilities and retail point-of-sale systems.',
    logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
    modes: ['destination'],
    authentication_methods: ['OAuth', 'Domain'],
  },
  {
    id: 49,
    connectionServiceName: 'Google Sheets',
    connectionServiceType: 'Spreadsheet',
    connectionServiceCategory: 'business_app',
    description:
      'A web-based spreadsheet application that enables collaborative editing, formatting and organization of data in real-time.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Google_Sheets_2020_Logo.svg',
    modes: ['both'],
    authentication_methods: ['OAuth'],
  },
];

export { connectionsData };
