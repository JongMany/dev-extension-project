// class ChartContainer {
//   selector: string;
//   drawer: Drawer;
//   svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
//   width: number;
//   height: number;

//   constructor(
//     containerSelector: string,
//     drawer: Drawer,
//     width = 960,
//     height = 450
//   ) {
//     this.selector = containerSelector;
//     this.drawer = drawer;
//     this.width = width;
//     this.height = height;

//     /* 초기 설정 작업 */
//     this.svg = this.makeSVGGroup(); // SVG 그룹을 만들고
//     this.drawer.setInitWork(this.svg); // 초기 설정 작업을 수행한다.
//   }

//   makeSVGGroup() {
//     const svg = d3.select(this.selector).select("svg").select(".chart");
//     return svg;
//   }

//   transform() {
//     this.svg.attr(
//       "transform",
//       "translate(" + this.width / 2 + "," + this.height / 2 + ")"
//     );
//   }

//   draw() {
//     // this.initializeForDraw();
//     /* 초기 설정 작업 */
//     // this.svg = this.makeSVGGroup(); // SVG 그룹을 만들고
//     this.drawer.setInitWork(this.svg); // 초기 설정 작업을 수행한다.
//     this.drawer.draw(this.svg); // 차트를 그린다.
//     this.transform();
//   }
// }

// interface Drawer {
//   setInitWork(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>): void;
//   draw(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>): void;
// }

// class PieChartDrawer implements Drawer {
//   radius: number;
//   data: any;
//   pie: any;
//   innerArc: any;
//   outerArc: any;
//   color: any;
//   slices: any;

//   constructor(radius: number, data: any) {
//     this.radius = radius;
//     this.data = data;
//     this.innerArc = this.setInnerArc();
//     this.outerArc = this.setOuterArc();
//     this.color = this.setColor();
//     this.pie = this.setPie();
//   }

//   setInitWork(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
//     this.removeChartGroup();
//     svg.append("g").attr("class", "slices");
//     svg.append("g").attr("class", "labels");
//     svg.append("g").attr("class", "lines");
//   }

//   removeChartGroup() {
//     // const group = d3.select(this.selector).select("svg").select(".chart");
//     // console.log(group.selectAll(".slices"));
//     // group.selectAll(".slices").remove();
//     // group.selectAll(".labels").remove();
//     // group.selectAll(".lines").remove();
//     d3.select("g.slices").remove();
//     d3.select("g.labels").remove();
//     d3.select("g.lines").remove();
//   }

//   private setPie() {
//     // (d3 as any).layout
//     return d3
//       .pie()
//       .sort(null)
//       .value((d: any) => d.duration);
//   }
//   private setInnerArc() {
//     /* Inner Arc */
//     return (
//       d3
//         // .svg
//         .arc()
//         .outerRadius(this.radius * 0.8)
//         .innerRadius(this.radius * 0.4)
//     );
//   }
//   private setOuterArc() {
//     /* Outer Arc */
//     return (
//       d3
//         // .svg
//         .arc()
//         .innerRadius(this.radius * 0.9)
//         .outerRadius(this.radius * 0.9)
//     );
//   }
//   private setColor() {
//     return d3
//       .scaleOrdinal()
//       .domain(this.data.map((d: any) => d.language))
//       .range([
//         "#98abc5",
//         "#8a89a6",
//         "#7b6888",
//         "#6b486b",
//         "#a05d56",
//         "#d0743c",
//         "#ff8c00",
//       ]);
//   }

//   draw(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
//     // this.setInitWork(svg);
//     this.pieSlice(svg);
//     this.textLabel();
//     this.sliceToTextPolyLines();
//   }

//   private pieSlice(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
//     const selection = d3.select(".slices");
//     console.log(selection);
//     const slice = selection
//       .selectAll("path.slice")
//       .data(this.pie(this.data), (data: any) => {
//         return data.data.language;
//       })
//       .enter()
//       .append("path")
//       .attr("class", "slice")
//       .style("fill", (d: any) => this.color(d.data.language));

//     slice
//       // .merge(slice as any)
//       .transition()
//       .duration(1000)
//       .attrTween("d", (d: any) => {
//         console.log("attrTween", d);
//         const i = d3.interpolate((this as any)._current, d);
//         (this as any)._current = i(0);
//         return (t: any) => this.innerArc(i(t));
//       });

//     // console.log("arc", arc);
//     // const arc = this.innerArc;
//     // slice
//     //   .transition()
//     //   .duration(1000)
//     //   .attrTween("d", function (d: any) {
//     //     console.log("attrTween", d);
//     //     (this as any)._current = (this as any)._current || d;
//     //     var interpolate = d3.interpolate((this as any)._current, d);
//     //     (this as any)._current = interpolate(0);
//     //     return function (t) {
//     //       return arc(interpolate(t));
//     //     };
//     //   });
//     // slice
//     //   .transition()
//     //   .duration(1000)
//     //   .attrTween("d", (d: any) => {
//     //     console.log(d);
//     //     return (t: any) => this.innerArc(d);
//     //   });

//     slice.exit().remove();
//   }

//   private textLabel() {}

//   private sliceToTextPolyLines() {}
// }
