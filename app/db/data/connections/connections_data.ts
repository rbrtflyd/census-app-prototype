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
  },
  {
    id: 2,
    connectionServiceName: 'HubSpot',
    connectionServiceType: 'CRM',
    connectionServiceCategory: 'business_app',
    description:
      'An inbound marketing and sales platform. It provides tools for content management, web analytics, and social media marketing.',
  },
  {
    id: 3,
    connectionServiceName: 'Zendesk',
    connectionServiceType: 'Customer Support',
    connectionServiceCategory: 'business_app',
    description:
      'A customer service software and support ticket system. It helps businesses provide seamless customer support across multiple channels.',
  },
  {
    id: 4,
    connectionServiceName: 'Slack',
    connectionServiceType: 'Communication',
    connectionServiceCategory: 'business_app',
    description:
      'A business communication platform offering many IRC-style features. It facilitates team collaboration through channels, direct messaging, and file sharing.',
  },
  {
    id: 5,
    connectionServiceName: 'Jira',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
    description: `An issue tracking and project management tool. It's widely used for software development to plan, track, and manage agile projects.`,
  },
  {
    id: 6,
    connectionServiceName: 'Asana',
    connectionServiceType: 'Project Management',
    connectionServiceCategory: 'business_app',
    description:
      'A web and mobile application designed to help teams organize, track, and manage their work. It offers features for task management, team collaboration, and workflow planning.',
  },
  {
    id: 7,
    connectionServiceName: 'Intercom',
    connectionServiceType: 'Customer Engagement',
    connectionServiceCategory: 'business_app',
    description:
      'A customer messaging platform that allows businesses to communicate with prospective and existing customers. It offers tools for live chat, marketing automation, and customer support.',
  },

  // Data Warehouses
  {
    id: 8,
    connectionServiceName: 'Snowflake',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A cloud-based data warehousing platform. It offers scalable storage and compute resources for data analytics and big data processing.',
  },
  {
    id: 9,
    connectionServiceName: 'Google BigQuery',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description: `A fully-managed, serverless data warehouse that enables super-fast SQL queries. It's designed to analyze large datasets efficiently.`,
  },
  {
    id: 10,
    connectionServiceName: 'Amazon Redshift',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A fully managed, petabyte-scale data warehouse service in the cloud. It allows you to analyze large volumes of data using your existing business intelligence tools.',
  },
  {
    id: 11,
    connectionServiceName: 'Azure Synapse Analytics',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'An analytics service that brings together enterprise data warehousing and big data analytics. It gives you the freedom to query data on your terms, using either serverless or dedicated resources.',
  },
  {
    id: 12,
    connectionServiceName: 'Databricks',
    connectionServiceType: 'Data Warehouse',
    connectionServiceCategory: 'warehouse',
    description:
      'A unified analytics platform for big data processing and machine learning. It provides a collaborative environment for data scientists, data engineers, and business analysts.',
  },

  // Social Media Ads Destinations
  {
    id: 13,
    connectionServiceName: 'Facebook Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An online advertising platform offered by Facebook. It allows businesses to create and run ads across Facebook, Instagram, Messenger, and the Audience Network.',
  },
  {
    id: 14,
    connectionServiceName: 'Google Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An online advertising platform developed by Google. It allows advertisers to display brief advertisements, service offerings, product listings, and video content within the Google ad network.',
  },
  {
    id: 15,
    connectionServiceName: 'LinkedIn Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'A marketing solution for businesses to advertise on LinkedIn. It offers various ad formats and targeting options to reach professionals and businesses.',
  },
  {
    id: 16,
    connectionServiceName: 'Twitter Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for promoting tweets and accounts on Twitter. It allows businesses to reach a wider audience and engage with potential customers.',
  },
  {
    id: 17,
    connectionServiceName: 'TikTok Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for the popular short-form video app TikTok. It enables businesses to create engaging video ads and reach a younger demographic.',
  },
  {
    id: 18,
    connectionServiceName: 'Pinterest Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for businesses to promote their products and services on Pinterest. It offers various ad formats like promoted pins and shopping ads.',
  },
  {
    id: 19,
    connectionServiceName: 'Snapchat Ads',
    connectionServiceType: 'Advertising',
    connectionServiceCategory: 'business_app',
    description:
      'An advertising platform for the multimedia messaging app Snapchat. It allows businesses to create interactive and engaging ads for a predominantly young audience.',
  },
  // Event Streaming Platforms
  {
    id: 20,
    connectionServiceName: 'Apache Kafka',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description: `An open-source distributed event streaming platform. It's capable of handling trillions of events a day and is used for building real-time data pipelines and streaming apps.`,
  },
  {
    id: 21,
    connectionServiceName: 'Amazon Kinesis',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A platform for streaming data on AWS, making it easy to collect, process, and analyze real-time, streaming data. It can handle any amount of data from hundreds of thousands of sources.',
  },
  {
    id: 22,
    connectionServiceName: 'Google Cloud Pub/Sub',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A fully-managed real-time messaging service that allows you to send and receive messages between independent applications. It provides reliable, many-to-many, asynchronous messaging.',
  },
  {
    id: 23,
    connectionServiceName: 'Azure Event Hubs',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A big data streaming platform and event ingestion service. It can receive and process millions of events per second and is designed to build scalable big data pipelines.',
  },
  {
    id: 24,
    connectionServiceName: 'RabbitMQ',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description: `An open-source message broker that supports multiple messaging protocols. It's lightweight and easy to deploy on premises and in the cloud.`,
  },
  {
    id: 25,
    connectionServiceName: 'Apache Pulsar',
    connectionServiceType: 'Event Streaming',
    connectionServiceCategory: 'event_stream',
    description:
      'A cloud-native, distributed messaging and streaming platform. It provides scalable, low-latency messaging with built-in geo-replication and multi-tenancy support.',
  },
];

export { connectionsData };
