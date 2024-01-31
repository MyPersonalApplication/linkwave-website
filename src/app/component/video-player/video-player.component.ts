import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @Input() videoUrl!: string;
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef;

  private player!: Plyr;

  ngOnInit() {
    // Initialize Plyr in the ngOnInit lifecycle hook
    this.player = new Plyr(this.videoPlayer.nativeElement);
  }

  ngOnDestroy() {
    // Destroy Plyr instance to prevent memory leaks
    if (this.player) {
      this.player.destroy();
    }
  }
}
