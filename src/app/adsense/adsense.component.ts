import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-adsense',
  standalone: true,
  imports: [],
  templateUrl: './adsense.component.html',
  styleUrl: './adsense.component.css'
})
export class AdsenseComponent implements AfterViewInit {
  @Input() adSlot!: string;
  ngAfterViewInit(): void {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {}
  }
}
