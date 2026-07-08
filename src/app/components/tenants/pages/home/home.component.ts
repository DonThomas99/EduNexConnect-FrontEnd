import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBanner, IPlan } from 'src/app/Models/tenants';
import { SuperAdminService } from 'src/app/services/super-admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  images!: IBanner[]
  plans: IPlan[] = []

  currentSlide = 0
  currentYear = new Date().getFullYear()
  private slideTimer?: ReturnType<typeof setInterval>

  constructor(
    private readonly superAdminService: SuperAdminService
  ) { }

  ngOnInit(): void {
    this.fetchBanner()
    this.fetchPlans()
  }

  ngOnDestroy(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer)
    }
  }

  fetchBanner() {
    this.superAdminService.fetchBanner().subscribe({
      next: (res) => {
        this.images = res.data
        if (this.images?.length > 1) {
          this.startAutoRotate()
        }
      }
    })
  }

  fetchPlans() {
    this.superAdminService.fetchPlans().subscribe({
      next: (res) => {
        this.plans = (res.data || []).slice(0, 3)
      }
    })
  }

  startAutoRotate() {
    this.slideTimer = setInterval(() => this.nextSlide(), 6000)
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.images.length
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
  }

  goToSlide(index: number) {
    this.currentSlide = index
  }
}
