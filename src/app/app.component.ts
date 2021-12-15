import { Component, OnInit } from "@angular/core";
import { registerElement } from "@nativescript/angular";
import { Color, LoadEventData } from "@nativescript/core";
import {
  setOpacity,
  setRadius,
  setupHeatmap,
  setupMarkerCluster,
} from "nativescript-danem-google-maps-utils";
import { Marker } from "nativescript-google-maps-sdk";
import { MapView, Position } from "nativescript-google-maps-sdk";

registerElement("MapView", () => MapView);
@Component({
  template: `
    <GridLayout>
      <MapView
        [latitude]="latitude"
        [longitude]="longitude"
        [zoom]="12"
        (mapReady)="onMapReady($event)">
      </MapView>
    </GridLayout>
  `,
  selector: "ns-app",
})
export class AppComponent {
  mapView: MapView;
  latitude = -32.561124;
  longitude = 115.76545;

  onMapReady(event: LoadEventData) {
    this.mapView = event.object as MapView;
    this.demoMarkerClusters();
    this.demoSetupHeatMap();
  }

  generateRandomPosition(position, distance) {
    var r = distance / 111300;

    var x = position[0];
    var y = position[1];

    var u = Math.random();
    var v = Math.random();

    var w = r * Math.sqrt(u);
    var t = 2 * Math.PI * v;

    var dx = (w * Math.cos(t)) / Math.cos(y);
    var xy = w * Math.sin(t);

    return [x + dx, y + xy];
  }

  demoMarkerClusters() {
    var markerSet = [];
    for (var i = 0; i < 400; i++) {
      markerSet.push(
        this.generateRandomPosition([this.latitude, this.longitude], 10000)
      );
    }

    markerSet = markerSet.map((position) => {
      const marker = new Marker();
      marker.position = Position.positionFromLatLng(position[0], position[1]);
      return marker;
    });

    setupMarkerCluster(this.mapView, markerSet);
  }

  demoSetupHeatMap() {
    var positionSet = [];
    for (var i = 0; i < 400; i++) {
      positionSet.push(
        this.generateRandomPosition([this.latitude, this.longitude], 10000)
      );
    }

    positionSet = positionSet.map((position) => {
      return Position.positionFromLatLng(position[0], position[1]);
    });

    let marker = new Marker();
    marker.position = Position.positionFromLatLng(-33.86, 151.20);

    setupHeatmap(
      this.mapView,
      positionSet,
      [new Color("#00FF00"), new Color("#FF0000")],
      [0.1, 0.5]
    );
    setOpacity(0.8);
    setRadius(80);
  }
}
