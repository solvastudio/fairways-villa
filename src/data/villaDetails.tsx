import React from "react";
import {
  Calendar,
  Bed,
  Maximize2,
  Bath,
  Sofa,
  Plane,
  Castle,
  Ticket,
  Users,
  Ban,
  Car,
  Trees,
  Waves,
  Clock,
  Wifi,
  Sun,
  Globe
} from "lucide-react";

export interface DetailItemData {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  subtitleKey?: string;
}

export const propertyDetails: DetailItemData[] = [
  {
    id: "check-in",
    icon: <Calendar className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.checkIn",
    subtitleKey: "villaDetail.checkInTime"
  },
  {
    id: "bedrooms",
    icon: <Bed className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.bedrooms",
    subtitleKey: "villaDetail.bedroomsBed"
  },
  {
    id: "villa-size",
    icon: <Maximize2 className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.villaSize",
    subtitleKey: "villaDetail.villaSizeVal"
  },
  {
    id: "check-out",
    icon: <Calendar className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.checkOut",
    subtitleKey: "villaDetail.checkOutTime"
  },
  {
    id: "bathrooms",
    icon: <Bath className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.bathrooms"
  },
  {
    id: "living-room",
    icon: <Sofa className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.livingRoom",
    subtitleKey: "villaDetail.livingRoomBeds"
  }
];

export const convenientLocations: DetailItemData[] = [
  {
    id: "airport",
    icon: <Plane className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.airportDist"
  },
  {
    id: "ampitheatre",
    icon: <Castle className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.aspendosDist"
  },
  {
    id: "theme-park",
    icon: <Ticket className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.legendsDist"
  }
];

export const popularFacilities: DetailItemData[] = [
  {
    id: "family-rooms",
    icon: <Users className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.familyRooms"
  },
  {
    id: "non-smoking",
    icon: <Ban className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.nonSmoking"
  },
  {
    id: "airport-shuttle",
    icon: <Plane className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.airportShuttle"
  },
  {
    id: "garden",
    icon: <Trees className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.garden"
  },
  {
    id: "pool",
    icon: <Waves className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.pool"
  },
  {
    id: "front-desk",
    icon: <Clock className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.frontDesk"
  },
  {
    id: "free-parking",
    icon: <Car className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.freeParking"
  },
  {
    id: "free-wifi",
    icon: <Wifi className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.freeWifi"
  },
  {
    id: "terrace",
    icon: <Sun className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.terrace"
  },
  {
    id: "staff",
    icon: <Globe className="w-[24px] h-[24px] stroke-[1.5]" />,
    titleKey: "villaDetail.staff"
  }
];

export interface FacilitySubcategory {
  id: string;
  items: string[];
}

export interface FacilityCategoryData {
  id: string;
  titleKey: string;
  subcategories: FacilitySubcategory[];
}

export const facilityCategoriesData: FacilityCategoryData[] = [
  {
    id: "inVillaComfort",
    titleKey: "villaDetail.facilitiesCategories.inVillaComfort",
    subcategories: [
      {
        id: "bedroom",
        items: [
          "premiumLinen",
          "wardrobeDressing",
          "extraLongBeds"
        ]
      },
      {
        id: "bathroom",
        items: [
          "privateBathroom",
          "showerBathtub",
          "towelsToiletries",
          "hairdryerSlippers"
        ]
      },
      {
        id: "kitchenDining",
        items: [
          "fullyEquippedKitchen",
          "coffeeMachineOvenStovetop",
          "refrigeratorKitchenware",
          "diningTable",
          "electricKettle",
          "childrensHighChair",
          "washingMachineDishwasher"
        ]
      },
      {
        id: "general",
        items: [
          "freeWifiAll",
          "airConditioning"
        ]
      }
    ]
  },
  {
    id: "livingEntertainment",
    titleKey: "villaDetail.facilitiesCategories.livingEntertainment",
    subcategories: [
      {
        id: "livingEntertainment",
        items: [
          "sofaLoungeDiningArea",
          "workspaceDesk",
          "flatScreenTvCableChannels"
        ]
      }
    ]
  },
  {
    id: "outdoorLiving",
    titleKey: "villaDetail.facilitiesCategories.outdoorLiving",
    subcategories: [
      {
        id: "outdoorLiving",
        items: [
          "privatePool",
          "sunTerraceBalcony",
          "gardenPatio",
          "outdoorDiningArea",
          "bbqFacilities"
        ]
      }
    ]
  },
  {
    id: "wellnessActivities",
    titleKey: "villaDetail.facilitiesCategories.wellnessActivities",
    subcategories: [
      {
        id: "wellnessActivities",
        items: [
          "massageServices",
          "sunLoungers",
          "beachAccess",
          "golfCourse",
          "cyclingDivingHorseRiding"
        ]
      }
    ]
  },
  {
    id: "servicesTransport",
    titleKey: "villaDetail.facilitiesCategories.servicesTransport",
    subcategories: [
      {
        id: "servicesTransport",
        items: [
          "frontDesk24h",
          "privateCheckInOut",
          "housekeepingOnRequest",
          "airportShuttleAdd",
          "carBicycleRental",
          "privateParkingOnSite"
        ]
      }
    ]
  },
  {
    id: "safetyGeneral",
    titleKey: "villaDetail.facilitiesCategories.safetyGeneral",
    subcategories: [
      {
        id: "safetyGeneral",
        items: [
          "safetyDepositBox",
          "smokeAlarmsFireExtinguishers",
          "soundproofRooms",
          "nonSmokingAreas",
          "multilingualStaffDetail"
        ]
      }
    ]
  }
];

