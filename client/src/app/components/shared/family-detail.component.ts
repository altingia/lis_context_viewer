// Angular
import { Component,
         Input,
         OnChanges,
         SimpleChanges } from '@angular/core';

// App
import { AppConfig }      from '../../app.config';
import { DetailsService } from '../../services/details.service';
import { Family }         from '../../models/family.model';
import { Gene }           from '../../models/gene.model';
import { MicroTracks }    from '../../models/micro-tracks.model';
import { Server }         from '../../models/server.model';

@Component({
  moduleId: module.id.toString(),
  selector: 'family-detail',
  template: `
    <h4>{{family.name}}</h4>
    <p><a href="#/multi/{{geneList}}">View genes in multi-alignment view</a></p>
    <p *ngIf="linkablePhylo"><a href="{{familyTreeLink}}">View genes in phylogram</a></p>
    <p>Genes:</p>
    <ul>
      <li *ngFor="let gene of genes">
        {{gene.name}}: {{gene.fmin}} - {{gene.fmax}}
      </li>
    </ul>
  `,
  styles: [ '' ]
})

export class FamilyDetailComponent implements OnChanges {

  private _serverIDs = AppConfig.SERVERS.map(s => s.id);

  @Input() family: Family;
  @Input() tracks: MicroTracks;

  genes: Gene[];
  geneList: string;
  linkablePhylo: boolean;
  familyTreeLink: string;

  constructor(private _detailsService: DetailsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.family !== undefined && this.tracks !== undefined) {
      this.genes = this.tracks.groups.reduce((l, group) => {
        let genes = group.genes.filter(g => {
          return (g.family.length > 0 && this.family.id.includes(g.family)) ||
            g.family == this.family.id;
        });
        l.push.apply(l, genes);
        return l;
      }, []);
      this.linkablePhylo = this.family.id != "" && new Set(this.genes.map(g => {
        return g.family;
      })).size == 1;

      this.geneList = this.genes.map(x => x.name).join(',');

      let idx = this._serverIDs.indexOf(this.genes[0].source);
     this.familyTreeLink = "http://legumeinfo.org/chado_gene_phylotree_v2?family=" + this.family.name + "&gene_name=" + this.geneList;
     if (idx != -1) {
       let s: Server = AppConfig.SERVERS[idx];
       if (s.hasOwnProperty('familyTreeLink')) {
        this.familyTreeLink = s.familyTreeLink.url + this.family.name;
       }
      }
    }
  }
}
